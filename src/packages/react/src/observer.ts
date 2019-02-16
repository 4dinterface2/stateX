import React, { useState, useRef, useEffect, useContext } from "react";
import { hookObserver } from "./observers/hookObserver";

// - как хук для простой react функции
// - для класса как декоратор
//
// == перспективы ==
// декорирование свойств классов компонентов
export const observer = target => {
  if (!target) {
    hookObserver();
  } else {
  }
};
