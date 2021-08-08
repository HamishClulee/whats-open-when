import Vue from "vue";

export const EventBus = new Vue();

export const LOADING = "LOADING";
export const MESSAGES = "MESSAGES";

export const EXAMPLE = {
  isVisible: true,
  text: "Successfully contacted API",
  bgColor: "additional",
  hasDarkText: false,
};
