import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ErrorPage from '../../../../../comps/AlertError';
import { MagicBtn } from '../../../../../comps/Buttons';
import NotificationSetting from '../../../../../comps/Dashboard/Setting/NotificationSetting';
import Roles from '../../../../../comps/Dashboard/Setting/Roles';
import UpdateRoles from '../../../../../comps/Dashboard/Setting/UpdateRoles';
import UserDetails from '../../../../../comps/Dashboard/Setting/UserDetails';
import LoadingPage from '../../../../../comps/LoadingPage';
import { AxiosJwt } from '../../../../../lib/axios';
import axios from '../../../../../lib/axios';
import {
  createManageUserSchemaAr,
  updateManageUserSchemaAr,
} from '../../../../../lib/validations/ar/manageUserSchemaAr';
import {
  createManageUserSchema,
  updateManageUserSchema,
} from '../../../../../lib/validations/en/manageUserSchema';
import {
  createManageUser,
  getManageUser,
  ResetSuccess,
  updateManageUser,
} from '../../../../../store/slices/manageUserSlice';
import styles from '../../../../../styles/Dashboard/dashboard.module.css';
import UserDetailsUpdate from '../../../../../comps/Dashboard/Setting/UserDetailsUpdate';

const FormUpdate = ({ userInfo }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, api_errors, success } = useSelector(
    (state) => state.manageUser
  );

  const roleList = [
    {
      label: t('dashboard.batch_invoices'),
      name: 'batch_invoices',
    },
    {
      label: t('dashboard.deposits'),
      name: 'deposits',
    },
    {
      label: t('dashboard.payment_links'),
      name: 'payment_links',
    },
    {
      label: t('dashboard.profile'),
      name: 'profile',
    },
    {
      label: t('dashboard.users'),
      name: 'users',
    },
    {
      label: t('dashboard.refund'),
      name: 'refund',
    },
    {
      label: t('dashboard.show_all_invoices'),
      name: 'show_all_invoices',
    },
    {
      label: t('dashboard.customers'),
      name: 'customers',
    },
    {
      label: t('dashboard.invoices'),
      name: 'invoices',
    },
    {
      label: t('dashboard.products'),
      name: 'products',
    },
    {
      label: t('dashboard.commissions'),
      name: 'commissions',
    },
    {
      label: t('dashboard.account_statement'),
      name: 'account_statements',
    },
    {
      label: t('dashboard.orders'),
      name: 'orders',
    },
    {
      label: t('dashboard.suppliers'),
      name: 'suppliers',
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      language == 'en' ? updateManageUserSchema : updateManageUserSchemaAr
    ),
    defaultValues: userInfo,
  });

  const { role_id } = watch();

  useEffect(() => {
    if (success) {
      dispatch(ResetSuccess());
      reset();
      router.push('/dashboard/setting/manageUsers');
    }
  }, [dispatch, reset, router, success]);

  useEffect(() => {
    if (role_id == 1) {
      roleList.forEach((role) => setValue(`${role.name}`, 1));
    }
  }, [role_id]);

  const onSubmit = (data) => {
    dispatch(updateManageUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* User Details */}
      <UserDetailsUpdate
        userInfo={userInfo}
        errors={errors}
        api_errors={api_errors}
        register={register}
        watch={watch}
      />

      {/* United Arab Emirates - Roles */}
      <UpdateRoles
        errors={errors}
        api_errors={api_errors}
        register={register}
        watch={watch}
        setValue={setValue}
        disabled
        roleList={roleList}
      />

      {/* Here is the notification */}
      <NotificationSetting
        errors={errors}
        api_errors={api_errors}
        register={register}
        watch={watch}
      />

      <MagicBtn
        isLoading={isLoading}
        label={t('dashboard.save')}
        disabled={false}
      />
    </form>
  );
};

export default function UpdateManageUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { manage_user, isLoading, api_errors, success } = useSelector(
    (state) => state.manageUser
  );

  useEffect(() => {
    id && dispatch(getManageUser({ user_id: id }));
  }, [dispatch, id]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {!manage_user && isLoading && <LoadingPage />}
        {!manage_user && api_errors && <ErrorPage />}
        {manage_user && (
          <>
            <FormUpdate userInfo={manage_user} />
          </>
        )}
      </div>
    </div>
  );
}
