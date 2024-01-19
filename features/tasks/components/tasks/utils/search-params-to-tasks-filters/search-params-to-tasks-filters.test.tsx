import { describe, expect, it } from "vitest";
import { searchParamsToTasksFilters } from "./search-params-to-tasks-filters.util";

describe.only("searchParamsToTasksFilters", () => {
  it("should return empty filters when no search params are provided", () => {
    expect(searchParamsToTasksFilters({})).toEqual({});
  });

  it("should return a filter for search if params include a search query", () => {
    expect(searchParamsToTasksFilters({ search: "foo" })).toEqual({
      search: "foo",
    });
  });

  it("should return the first value of an array if the search param is an array", () => {
    expect(searchParamsToTasksFilters({ search: ["foo", "bar"] })).toEqual({
      search: "foo",
    });
  });

  it("should not return a filter for search if params include a search query with an empty string", () => {
    expect(searchParamsToTasksFilters({ search: "" })).toEqual({});
  });

  it("should not return a filter for search if params include a search query with only whitespace", () => {
    expect(searchParamsToTasksFilters({ search: " " })).toEqual({});
  });

  it("should return a filter for category if params include a category query", () => {
    expect(searchParamsToTasksFilters({ category: "foo" })).toEqual({
      category: "foo",
    });
  });

  it("should return the first value of an array if the category param is an array", () => {
    expect(searchParamsToTasksFilters({ category: ["foo", "bar"] })).toEqual({
      category: "foo",
    });
  });

  it("should not return a filter for category if params include a category query with an empty string", () => {
    expect(searchParamsToTasksFilters({ category: "" })).toEqual({});
  });

  it("should not return a filter for category if params include a category query with only whitespace", () => {
    expect(searchParamsToTasksFilters({ category: " " })).toEqual({});
  });

  it("should not return a filter for status if params include a status query with a value other than 'completed' or 'uncompleted'", () => {
    expect(searchParamsToTasksFilters({ status: "foo" })).toEqual({});
  });

  it("should return a filter for status if params include a status query with the value of 'completed' or 'uncompleted'", () => {
    expect(searchParamsToTasksFilters({ status: "completed" })).toEqual({
      status: "completed",
    });
  });

  it("should return a filter with the first value of an array if the status param is an array", () => {
    expect(
      searchParamsToTasksFilters({ status: ["completed", "bar"] }),
    ).toEqual({
      status: "completed",
    });
  });

  it("should not return a filter for priority if the params include a priority query with a non-number value", () => {
    expect(searchParamsToTasksFilters({ priority: "foo" })).toEqual({});
  });

  it("should return a filter for priority if the params include a priority query with a valid number", () => {
    expect(searchParamsToTasksFilters({ priority: "1" })).toEqual({
      priority: 1,
    });
  });

  it("should return a filter with the first value of an array if the priority param is an array", () => {
    expect(searchParamsToTasksFilters({ priority: ["1", "2"] })).toEqual({
      priority: 1,
    });
  });

  // several params
  it("should return a filter for search, category, status, and priority if params include all of those queries", () => {
    expect(
      searchParamsToTasksFilters({
        search: "foo",
        category: "bar",
        status: "completed",
        priority: "1",
      }),
    ).toEqual({
      search: "foo",
      category: "bar",
      status: "completed",
      priority: 1,
    });
  });

  it("should return filters for all of the valid params", () => {
    expect(
      searchParamsToTasksFilters({
        search: "foo",
        category: "bar",
        status: "completed",
        priority: "1",
      }),
    ).toEqual({
      search: "foo",
      category: "bar",
      status: "completed",
      priority: 1,
    });

    expect(
      searchParamsToTasksFilters({
        search: "foo",
        category: "bar",
        priority: "1",
      }),
    ).toEqual({
      search: "foo",
      category: "bar",
      priority: 1,
    });

    expect(
      searchParamsToTasksFilters({
        search: "foo",
        category: "bar",
        status: "completed",
      }),
    ).toEqual({
      search: "foo",
      category: "bar",
      status: "completed",
    });

    expect(
      searchParamsToTasksFilters({
        search: "foo",
        status: "invalid",
        priority: "1",
      }),
    ).toEqual({
      search: "foo",
      priority: 1,
    });
  });
});
