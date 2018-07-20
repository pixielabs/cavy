import TestHookStore from '../TestHookStore'

describe("TestHookStore", () => {
  it("initializes hooks by default", () => {
    const testHookStore = new TestHookStore();

    expect(testHookStore.hooks).toBeDefined();
  });

  it("can add components", () => {
    const testHookStore = new TestHookStore();
    testHookStore.add("key", "value");

    expect(testHookStore.get("key")).toEqual("value");
  })

  it("overrides when adding an existing component", () => {
    const testHookStore = new TestHookStore();
    testHookStore.add("key", "value1");
    testHookStore.add("key", "value2");

    expect(testHookStore.get("key")).toEqual("value2");
  });

  it("can delete components", () => {
    const testHookStore = new TestHookStore();
    testHookStore.add("key", "value");
    testHookStore.remove("key");

    expect(testHookStore.get("key")).toBeUndefined();
  });
});
