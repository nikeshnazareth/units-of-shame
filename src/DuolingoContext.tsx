import React, { Component, createContext } from "react";
import { User } from "./types/user";

const baseURL = "https://duoproxy.nfshost.com/user";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  competitors: string[];
}

export class DuolingoProvider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      competitors: ["AliceHensh", "jbcarpanelli", "EricDeCour", "NikeshNaza"],
    };
  }

  getXP = (): Promise<User[]> =>
    Promise.all(
      this.state.competitors
        .map((username) => `${baseURL}/${username}`)
        .map((url) => fetch(url).then((res) => res.json()))
    );

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
  getXP(): Promise<User[]>;
};

export const DuolingoContext: React.Context<DuolingoContextProps> =
  createContext({} as DuolingoContextProps);
