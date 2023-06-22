import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa"
const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitialize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitialize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`
}


export default function Todo({ todo }: { todo: string }) {
    return (
        <li className={style.li}>
            <div className={style.row}>
                <input type="checkbox" />
                <p className={style.text}>
                    {todo}
                </p>
            </div>
            <button className={style.button}>
                <FaRegTrashAlt />
            </button>
        </li>
    )
}