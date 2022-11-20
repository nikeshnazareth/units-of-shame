import React, { Component, createContext } from "react";
import { User } from "./types/user";
const Duolingo = require("duolingo-api");

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
        .map((username) => ({ username }))
        .map((credential) => new Duolingo(credential))
        // not sure why getDataByFields doesn't work or why getRawData returns a list of users
        // even though there is only one user in the credential. This should be cleaned up
        .map((duoAPI) =>
          duoAPI
            .getRawData()
            .then((result: any) => result.users[0])
            .then(
              (u: any) =>
                ({
                  name: u.name,
                  username: u.username,
                  XP: u.totalXp,
                } as User)
            )
        )
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
