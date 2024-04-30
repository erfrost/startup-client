import useGetUser from "../../app/hooks/requests/user/useGetUser";
import MainLayout from "../../layouts/MainLayout";
import styles from "./index.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect } from "react";
import User from "../../app/models/user";
import ProfileEdit from "../../features/ProfileEdit";
import { useRecoilValue } from "recoil";
import { userState } from "../../app/storage/atoms";
import SettingsBtn from "../../shared/SettingsBtn";

const ProfilePage = () => {
  const user = useRecoilValue<User | null>(userState);
  const getUser = useGetUser();

  useEffect(() => {
    async function fetch() {
      if (user) return;
      await getUser();
    }

    fetch();
  }, []);

  if (!user) return;

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pageTitle}>Мой Профиль</span>
          <SettingsBtn />
        </div>
        <div className={styles.content}>
          <ProfileEdit user={user} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
