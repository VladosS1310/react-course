import React, { FunctionComponent } from "react";
import { Link as RouteLink } from 'react-router-dom';
const styles = require('./Link.css');

interface Props {
    title?: string;
    path: string;
}

export const Link: FunctionComponent<Props> = ({ title, path }: Props) => {
    return <RouteLink to={path} className="link">
        {title}
    </RouteLink>;
};