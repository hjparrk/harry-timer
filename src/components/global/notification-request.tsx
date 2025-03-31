"use client";

import { Fragment, useEffect } from "react";

export default function NotificationRequest() {
  useEffect(() => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("Browser does not support notifications.");
      return;
    }

    // If permission is granted, do nothing
    if (Notification.permission === "granted") {
      console.log("Notification permission already granted.");
      return;
    }

    // If permission is denied, do nothing
    if (Notification.permission === "denied") {
      console.log("Notification permission denied.");
      return;
    }

    // Request notification permission if it's in default state
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        new Notification("Notification permission granted!");
      } else {
        console.log("Notification permission denied.");
      }
    });
  }, []);

  return <Fragment />;
}
