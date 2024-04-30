import User from "../../app/models/user";
import styles from "./index.module.scss";
import DatePicker from "./ui/DatePicker";
import { ChangeEvent, useEffect, useState } from "react";
import formatPhone from "../../utils/formatPhone";
import { FaCamera } from "react-icons/fa6";
import _ from "lodash";
import useUpdateUser from "../../app/hooks/requests/user/useUpdateUser";
import Form from "../../shared/Form";
import transformAvatar from "../../utils/transformAvatarUrl";
import UpdatedAlert from "../../shared/UpdatedAlert";
import Files from "../../app/models/files";
import useUploadFile from "../../app/hooks/requests/useUploadFile";

interface ProfileEditProps {
  user: User;
}

const ProfileEdit = ({ user }: ProfileEditProps) => {
  const [userData, setUserData] = useState<User>(user);
  const [date, setDate] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const uploadFile = useUploadFile();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (_.isEqual(userData, user)) setIsUpdated(false);
    else setIsUpdated(true);
  }, [userData]);

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage: File = e.target.files[0];
    if (!selectedImage) return;

    setFile(selectedImage);

    const reader: FileReader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(selectedImage);
    setIsUpdated(true);
  };

  const onReset = () => {
    setUserData(user);
    setImage(null);
    setFile(null);
    setIsUpdated(false);
  };

  const onSubmit = async () => {
    let imageUrl: string | null = null;

    if (file && image) {
      const { url }: Files = await uploadFile(file);
      imageUrl = url;

      setUserData((prevState: User) => ({
        ...prevState,
        avatar_url: imageUrl,
      }));
    }

    if (date) {
      setUserData((prevState: User) => ({
        ...prevState,
        birth_date: date,
      }));
    }

    await updateUser(imageUrl, userData);

    window.location.reload();
  };

  const onSaveDate = (year: string, month: string, day: string) => {
    setDate(`${month} ${day}, ${year}`);
    setIsUpdated(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.block1}>
        <div className={styles.mainLeft}>
          <div className={styles.avatarContainer}>
            <img
              src={image || transformAvatar(user.avatar_url)}
              alt="avatar"
              className={styles.avatar}
            />
            <div className={styles.avatarEditBtn}>
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                className={styles.fileInput}
                onChange={onChangeAvatar}
              />
              <FaCamera className={styles.bigIcon} />
            </div>
          </div>
          <span className={styles.name}>{user.nickname}</span>
          <span className={styles.role}>{user.role}</span>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.block2}>
        <span className={styles.blockTitle}>Основное</span>
        <Form
          label="Никнейм"
          placeholder="Иван Иваныч"
          value={userData.nickname}
          setValue={(e: ChangeEvent<HTMLInputElement>) =>
            setUserData((prevState: User) => {
              return { ...prevState, nickname: e.target.value };
            })
          }
          colorTheme="rose"
        />
        <DatePicker
          label="Дата рождения"
          placeholder="Январь 1, 2010"
          value={user.birth_date || date}
          onSaveDate={onSaveDate}
        />
      </div>
      <div className={styles.block2}>
        <span className={styles.blockTitle}>Контакты</span>
        <Form
          label="Электронная почта"
          placeholder={user.email}
          value={userData.email}
          setValue={(e: ChangeEvent<HTMLInputElement>) =>
            setUserData((prevState: User) => {
              return { ...prevState, email: e.target.value };
            })
          }
          colorTheme="rose"
        />
        <Form
          label="Телефон"
          placeholder="+7 981 765 43-21"
          value={userData.phone}
          setValue={(e: ChangeEvent<HTMLInputElement>) =>
            setUserData((prevState: User) => {
              return {
                ...prevState,
                phone: formatPhone(prevState.phone, e.target.value),
              };
            })
          }
          colorTheme="rose"
        />
        <Form
          label="Discord"
          placeholder="Discord 2256"
          value={userData.discord}
          setValue={(e: ChangeEvent<HTMLInputElement>) =>
            setUserData((prevState: User) => {
              return {
                ...prevState,
                discord: e.target.value,
              };
            })
          }
          colorTheme="rose"
        />
      </div>
      {isUpdated && <UpdatedAlert onReset={onReset} onSubmit={onSubmit} />}
    </div>
  );
};

export default ProfileEdit;
