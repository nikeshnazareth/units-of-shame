import React, { Component, createContext } from "react";
import { User, UserConfig } from "./types/user";
import { userConfig } from "./user-config";

const baseURL = "https://duoproxy.nfshost.com/user";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  competitors: UserConfig[];
}

export class DuolingoProvider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      competitors: userConfig,
    };
  }

  getXP = (cfg: UserConfig): Promise<User> =>
    fetch(`${baseURL}/${cfg.username}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));

  getCompetitors = (): UserConfig[] => this.state.competitors;

  render() {
    const { getXP, getCompetitors } = this;
    return (
      <DuolingoContext.Provider value={{ getXP, getCompetitors }}>
        {this.props.children}
      </DuolingoContext.Provider>
    );
  }
}

type DuolingoContextProps = {
  getXP(cfg: UserConfig): Promise<User>;
  getCompetitors(): UserConfig[];
};

export const DuolingoContext: React.Context<DuolingoContextProps> =
  createContext({} as DuolingoContextProps);
