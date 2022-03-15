import React, {useMemo} from "react";
import {keyBy, shuffle} from "lodash";
import verbs from "./verbs";
import {Verb} from "./Type";
import {TableVerbs} from "./TableVerbs";

export const Application = () => {
    const currentPage = 1
    const verbDictionary = useMemo(() => {
        const subVerbs = verbs.slice((10 * currentPage) - 10, 10 * currentPage);
        return keyBy<Verb>(shuffle(subVerbs), verb => verb.v1)
    }, [verbs])

    return (
        <TableVerbs verbDictionary={verbDictionary}/>
    )
}