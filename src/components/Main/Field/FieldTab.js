// 1.2_FieldTab.js
import React from "react";
import { FieldFeed } from "./Feed/FieldFeed";
import { FieldProfile } from "./Profile/FieldProfile";

export function FieldTab({ view }) {
  return (
    <div className="w-full h-full">
      {view === "feed" ? <FieldFeed /> : <FieldProfile />}
    </div>
  );
}
