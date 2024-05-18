import SuccessNotify from "@components/ui/notify/SuccessNotify.tsx";
import React from "react";

const usePushNotify = () => {
        React.createElement(SuccessNotify, {
            title: "Push Notify Success",
            description: "Push Notify Success",
        })
}

export default usePushNotify