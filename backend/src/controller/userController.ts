import { Request, Response } from "express";
import user from "../model/UserModel";
import transactions from "../model/TransactionModel";
import { handleError } from "../utils/ErrorHandler";
import { paymentIdGenerator } from "../utils/paymentIdGenerator";

export const generateNewId = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let client = await user.findOne({ email });

  try {
    if (client) {
      if (password === client?.password) {
        if (client.paymentId.length <= 4) {
          let newId = await paymentIdGenerator();
          client.paymentId.push(newId);
          client
            .save()
            .then((data) =>
              res.json({
                status: "success",
                paymentId: client?.paymentId,
              })
            )
            .catch((err: any) => {
              let error = handleError(err);
              res.json(error);
            });
        } else {
          res.json({
            status: "error",
            error: "Maximum amount of Payment Id created",
          });
        }
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Email not found");
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};

export const deleteId = async (req: Request, res: Response) => {
  const { email, password, id } = req.body;

  let client = await user.findOne({ email });

  try {
    if (client) {
      if (password === client?.password) {
        if (client.paymentId.length > 1) {
          let indexOfId = client.paymentId.indexOf(id);
          console.log(indexOfId);

          if (indexOfId >= 0) {
            let popped = client.paymentId.splice(indexOfId, 1);
            console.log(client.paymentId);

            client
              .save()
              .then((data) =>
                res.json({
                  status: "success",
                  paymentId: data?.paymentId,
                })
              )
              .catch((err: any) => {
                let errorMessage = handleError(err);
                res.json({
                  status: "error",
                  error: errorMessage,
                });
              });
          } else {
            throw Error("Id does not exist");
          }
        } else {
          res.json({
            status: "error",
            error: "Minimum 1 payment Id required",
          });
        }
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Email not found");
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};

export const searchById = (req: Request, res: Response) => {
  const { id } = req.body;

  user
    .findOne({
      paymentId: {
        $in: [id],
      },
    })
    .then((data) => {
      if (data) {
        res.json({
          status: "success",
          data: data,
        });
      } else {
        res.json({
          status: "error",
          error: "User not found",
        });
      }
    })
    .catch((err: any) => {
      let errorMessage = handleError(err);
      res.json({
        status: "error",
        error: errorMessage,
      });
    });
};

export const sendFunds = async (req: Request, res: Response) => {
  let { email, password, recipientId, amount } = req.body;
  amount = Number(amount);

  let client = await user.findOne({ email });

  try {
    if (client) {
      if (password === client?.password) {
        client.balance = Number(client.balance);
        if (client.balance >= amount) {
          //Searching for the recipient Id
          let recipient = await user.findOne({
            paymentId: { $in: [recipientId] },
          });

          if (recipient) {
            recipient.balance = Number(recipient.balance);

            //Ensuring the there is no self tranfers
            if (recipient.email !== client.email) {
              client.balance = client.balance - amount;
              recipient.balance = recipient.balance + amount;

              client
                .save()
                .then((data) => {
                  //   console.log(`${data.email} sent ${amount} to ${recipientId}`);
                })
                .catch((err: any) => {
                  let errorMessage = handleError(err);
                  res.json({
                    status: "failed",
                    error: errorMessage,
                  });
                });

              try {
                recipient
                  .save()
                  .then((data) => {
                    // console.log(
                    //   `${recipientId} has recieved ${amount} from ${email}`
                    // );
                  })
                  .catch((err: any) => {
                    let errorMessage = handleError(err);
                    res.json({
                      status: "failed",
                      error: errorMessage,
                    });
                  });

                //Creating the transaction history
                let newTransaction = await transactions.create({
                  emails: [client.email, recipient.email],
                  senderEmail: client.email,
                  recieverEmail: recipient.email,
                  recieverId: recipientId,
                  amount: amount,
                  dateOfTransaction: new Date().toUTCString(),
                });

                res.json({
                  status: "success",
                  message: "Transaction successful",
                  balance: client.balance,
                });
              } catch (err: any) {
                //Reverting the transaction if anything went wrong

                client.balance = client.balance + amount;
                client.save();
                let errorMessage = handleError(err);
                res.json({
                  status: "failed",
                  error: errorMessage,
                });
              }
            } else {
              res.json({
                status: "failed",
                error: "Self transfer detected",
              });
            }
          } else {
            res.json({
              status: "error",
              error: "User not found",
            });
          }
        } else {
          throw Error("Insufficient funds");
        }
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Email not found");
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let client = await user.findOne({ email });

  try {
    if (client) {
      if (password === client?.password) {
        let transactionHistory = await transactions.find({
          emails: { $in: [email] },
        });

        if (transactionHistory) {
          res.json({
            status: "success",
            data: transactionHistory,
          });
        } else {
          res.json({
            status: "failed",
            error: "couldnt fetch transactions",
          });
        }
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Email not found");
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};
