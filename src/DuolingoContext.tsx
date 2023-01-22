import React, { Component, createContext } from "react";
import { User, UserConfig } from "./types/user";
import { userConfig } from "./user-config";

// obtained from https://github.com/JinKim7/duolingo-api/blob/master/src/Duolingo.js#L6
const baseURL = "https://www.duolingo.com/2017-06-30/users";

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
    fetch(`${baseURL}?username=${cfg.username}`)
      .then((res) => res.json())
      .then((data) => data.users[0])
      .then((user) =>
        Object.assign(cfg, {
          name: user.name,
          username: user.username,
          XP: user.totalXp,
        })
      );

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
