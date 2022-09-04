import styles from "~/styles/routes/__main/profile.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const Profile = () => (
  <section className="screen profile">
    <h2>Profile</h2>
  </section>
);

export default Profile;
