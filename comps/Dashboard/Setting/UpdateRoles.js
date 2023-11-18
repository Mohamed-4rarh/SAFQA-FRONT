import styles from '../../../styles/Dashboard/Create.module.css';
import { SafqaCheckBox, SafqaNewCheckBox, SafqaRadioInput, SafqaSelect } from '../Inputs';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'next-themes';

const UpdateRoles = ({
  roleList,
  errors,
  api_errors,
  register,
  watch,
  setValue,
}) => {
  const { theme } = useTheme();
  const { roles } = useSelector((state) => state.role);
  const { stored_roles } = useSelector((state) => state.manageUser);

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div
        className={`rounded-2 ${
          theme == 'dark' ? styles.info_dark : styles.info
        }`}
        dir={language == 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="d-flex justify-content-between">
          <p className="px-4 fs-5">{t('dashboard.roles')}</p>
          <div className="d-flex mx-3" style={{ width: '150px' }}>
            <SafqaSelect
              options={stored_roles}
              option_name="name_en"
              option_name_ar="name_ar"
              name="role_id"
              register={register}
              required
              error={errors.role_id?.message || api_errors?.role_id}
            />
          </div>
        </div>
        <hr />

        <div className="ms-3 row">
          {roleList.map((role) => (
            <div
              key={role.name}
              className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6 px-4 mt-3 text-wrap"
            >
              <SafqaNewCheckBox
                register={register}
                name={role.name}
                label={role.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateRoles;
