import React, { FunctionComponent } from 'react';
import { routes, AppRoute } from '../App/Routes';
import { Link } from './Link';
import './Header.css';


interface Props {
    onLogOut: () => void;
}

export const Header: FunctionComponent<Props> = ({ onLogOut }: Props) => {
    return (
        <header className='header'>
            <div className='content_header'>
                <div className='block'>
                    {routes.map(({ title, path, isHidden }: AppRoute, i: number) =>
                        isHidden ? null : (
                            <Link key={i} title={title} path={path} />
                        )
                    )}
                </div>
                <Link title={"OAuth"} path={'/oauth'}/>
                <button onClick={onLogOut}>Log out</button>
            </div>
        </header>
    );
};