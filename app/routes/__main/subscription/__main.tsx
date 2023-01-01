/* External dependencies */
import React from "react";
import {Outlet} from "@remix-run/react";

/* Internal dependencies */
import styles from "~/styles/routes/__main/profile.css";
import {Tabs} from "~/components/common/Tabs";

export function links() {
   return [{rel: "stylesheet", href: styles}];
}

const Main = () => {
   return (
      <section className="screen profile">
         <header className="tabsHeader">
            <Tabs
               items={[
                  {title: "All", to: "/subscription/allSubscription"},
                  {title: "Active", to: "/subscription/activeSubscription"}
               ]}
            />
         </header>
         <Outlet />
      </section>
   );
};

export default Main;
