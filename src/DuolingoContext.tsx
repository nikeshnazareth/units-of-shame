import React, { Component, createContext } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  XP: number;
}

export class DuolingoProvider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      XP: 100,
    };
  }

  getXP = (): number => this.state.XP;

  render() {
    const { getXP } = this;
    return (
      <DuolingoContext.Provider value={{ getXP }}>
        {this.props.children}
      </DuolingoContext.Provider>
    );
  }
}

type DuolingoContextProps = {
  getXP(): number;
};

export const DuolingoContext: React.Context<DuolingoContextProps> =
  createContext({} as DuolingoContextProps);
