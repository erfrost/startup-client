import { useEffect, useState } from "react";
import SearchInput from "../../../../shared/SearchInput";
import styles from "./index.module.scss";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdOutlineExitToApp } from "react-icons/md";
import { useGetUser } from "../../../../app/hooks/requests/user/useGetUser";
import User from "../../../../app/models/user";
import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../app/storage/atoms";
import Popover from "../../../../shared/Popover";
import transformAvatar from "../../../../utils/transformAvatarUrl";
import AvatarWrapper from "../../../../shared/AvatarWrapper";

const Header = () => {
  const user = useRecoilValue<User | null>(userState);
  const [searchText, setSearchText] = useState<string>("");
  const router: NavigateFunction = useNavigate();
  const getUser = useGetUser();

  const onEnterClick = async (): Promise<void> => {
    if (!searchText.length) return;
  };

  useEffect(() => {
    async function fetch() {
      if (user) return;
      await getUser();
    }

    fetch();
  }, []);

  const onExit = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");

    router("/signIn");
  };

  if (!user) return;

  return (
    <div className={styles.container}>
      <SearchInput
        value={searchText}
        setValue={setSearchText}
        onEnterClick={onEnterClick}
      />
      <div className={styles.btn}>
        <IoNotificationsOutline className={styles.icon} />
      </div>
      <Popover
        popoverContent={
          <div className={styles.linksList}>
            <Link to="/profile" className={styles.link}>
              <FaUser className={styles.smallIcon} />
              <span>Профиль</span>
            </Link>
            <Link to="/settings" className={styles.link}>
              <IoSettingsOutline className={styles.smallIcon} />
              <span>Настройки</span>
            </Link>
            <div className={styles.link} onClick={onExit}>
              <MdOutlineExitToApp className={styles.smallIcon} />
              <span>Выйти</span>
            </div>
          </div>
        }
      >
        <div className={styles.btn}>
          <AvatarWrapper src={user.avatar_url} size="30px" />
          <span className={styles.name}>{user.nickname}</span>
          <MdKeyboardArrowDown className={styles.icon} />
        </div>
      </Popover>
    </div>
  );
};

export default Header;
