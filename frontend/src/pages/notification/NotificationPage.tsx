import React from "react";
import { Md10K } from "react-icons/md";
import { NoNotification } from "../../svg";
import ComponentHeader from "../../components/componentsHeader/ComponentHeader";

const NotificationPage: React.FC = () => {
  return (
    <div>
      <ComponentHeader />
      <NoNotification />
    </div>
  );
};

export default NotificationPage;
