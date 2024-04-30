import styles from "./index.module.scss";
import logo from "../../../../assets/logo-white.svg";
import { LinkInterface } from "./interfaces";
import { studentLinks, teacherLinks } from "./mock/links";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUser from "../../../../app/hooks/requests/user/useGetUser";
import User from "../../../../app/models/user";
import { UserRole } from "../../../../enums";

const Navigation = () => {
  const getUser = useGetUser();
  const [currentLinks, setCurrentLinks] = useState<LinkInterface[] | undefined>(
    undefined
  );
  const location = useLocation();

  useEffect(() => {
    async function fetch() {
      const currentUser: User = await getUser();

      const role: string = currentUser.role;
      localStorage.setItem("role", role);

      let links: LinkInterface[] | undefined = undefined;

      if (role === UserRole.Student) links = studentLinks;
      else if (role === UserRole.Teacher) links = teacherLinks;

      if (!links) return;

      const path: string = location.pathname;
      const updatedLinks: LinkInterface[] = links.map((link: LinkInterface) => {
        return {
          ...link,
          active: link.to === path,
        };
      });

      setCurrentLinks(updatedLinks);
    }

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" />
      <div className={styles.linksList}>
        {currentLinks?.map((link: LinkInterface, index: number) => (
          <Link
            to={link.to}
            className={`${styles.link} ${link.active && styles.active}`}
            key={index}
          >
            <link.icon className={styles.icon} />
            <span className={styles.text}>{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
