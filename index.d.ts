import React from 'react';

type RefCallback = (element: React.ReactNode | null) => void;
export type TestHookGenerator = (label: string, callback?: RefCallback) => RefCallback;

export type WithTestHook<T extends {}> = T & { generateTestHook: TestHookGenerator };

export function hook<T extends {}>(component: React.ComponentClass<WithTestHook<T>>): React.ComponentClass<T>;

export class TestHookStore {
}

export type TesterProps = {
  specs: Array<(spec: TestScope) => void>;
  store: TestHookStore;
  waitTime: number;
  sendReport?: boolean;
};

export class Tester extends React.Component<TesterProps> {
  reRender(): void;
  clearAsync(): Promise<void>;
}

export class TestScope {
  component: Tester;
  findComponent<T extends React.Component>(identifier: string): Promise<T>;
  describe(label: string, fn: () => void): void;
  it(label: string, fn: () => void): void;
  press(identifier: string): Promise<void>;
  fillIn(identifier: string, str: string): Promise<void>;
  pause(time: number): Promise<void>;
  exists(identifier: string): Promise<true>;
  notExists(identifier: string): Promise<true>;
}
