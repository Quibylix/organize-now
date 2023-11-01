import App from "@/App.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("App.vue", () => {
  it("should render", () => {
    const wrapper = mount(App);

    expect(wrapper.exists()).toBe(true);
  });
});
