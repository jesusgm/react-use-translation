import React from "react";
import useTranslation from "./useTranslation";
import Adapter from "enzyme-adapter-react-16";
import { mount, shallow, render, configure } from "enzyme";

configure({ adapter: new Adapter() });

const Example = (props) => {
  const messages = {
    es: { key: "valor" },
    en: { key: "value" },
  };

  const config = {
    messages,
    defaultLang: "en",
  };
  const t = useTranslation(config);

  return <div className="container">{t("key")}</div>;
};

describe("useTranslation", () => {
  test("works", () => {
    const wrapper = render(<Example />);

    console.log(wrapper.text());

    expect(wrapper.text()).toEqual("value");

    // expect(wrapper.text()).toEqual("value");
  });
});
