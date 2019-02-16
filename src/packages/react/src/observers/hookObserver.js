import React, { useState, useRef, useEffect, useContext } from "react";
import { useClient } from "../provider";

let hookCount = 0;
let observers = [];

export const hookObserver = () => {
  const [uid, update] = useState("hook" + hookCount++);
  const client = useClient();
  const { manager } = client.store;
  manager.pushObserver(uid, () => update(uid));

  useEffect(() => {
    manager.popObserver(uid); //TODO В теории должно работать
    return () => {
      manager.clearObserver(uid);
    };
  });
};
