import { Feature } from "@/components/home";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("Feature.vue", () => {
  it("should render the title and the description", () => {
    const wrapper = mount(Feature, {
      props: {
        title: "Create Tasks",
        description:
          "Create tasks to do, set due dates, and check them off when you're done!",
      },
    });

    expect(wrapper.find("h3").text()).toBe("Create Tasks");
    expect(wrapper.find("p").text()).toBe(
      "Create tasks to do, set due dates, and check them off when you're done!",
    );
  });
});
