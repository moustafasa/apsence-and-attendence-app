import { Fragment } from "react";
import Skeleton from "./Skeleton";

export default function AdminNotificationSkeleton() {
  return Array(4)
    .fill(0)
    .map((_, i) => (
      <Fragment key={i}>
        {i !== 0 && <hr />}
        <li className="w-[330px] p-3">
          <div className="flex items-center gap-3">
            <Skeleton classNames="sk-header inline-block me-2 w-[35%] !bg-black-300" />
            <Skeleton classNames="sk-text !bg-black-300 w-[60%]" />
          </div>
          <div className="flex items-center justify-between gap-3 mt-3  ">
            <Skeleton classNames="sk-text !bg-black-300 w-[60%] " />
            <Skeleton classNames="sk-text !bg-black-300 w-[20%]" />
          </div>
        </li>
      </Fragment>
    ));
}
