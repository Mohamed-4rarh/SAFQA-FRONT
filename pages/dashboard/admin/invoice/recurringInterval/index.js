import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnShow, BtnTables, MagicLinkIcon } from "../../../../../comps/Buttons";
import SafqaTable from "../../../../../comps/common/SafqaTable";
import { deleteRecurringInterval, getRecurringIntervals } from "../../../../../store/slices/recurringIntervalSlice";
import TableStyles from "../../../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import { useEffect } from "react";
import NavAdminInvoice from "../../../../../comps/Dashboard/Setting/NavAdminInvoice";

const RecurringInterval = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { recurring_intervals, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.recurringInterval);

    const columns = [
        {
            title: t("dashboard.name_En"),
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: t("dashboard.name_Ar"),
            dataIndex: 'name_ar',
            key: 'name_ar',
        },
        {
            title: language == 'en' ? 'Actions' : 'أجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, recurring_interval) =>
                <Space>
                    {/* <BtnShow href={`../../dashboard/admin/invoice/recurring_interval/${recurring_interval.id}`} /> */}
                    <BtnEdit href={`/dashboard/admin/invoice/recurringInterval/update/${recurring_interval.id}`} />
                    <BtnNewDelete
                        title={recurring_interval[language == 'en' ? "name_en" : "name_ar"]}
                        item={recurring_interval}
                        handleDelete={deleteRecurringInterval}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getRecurringIntervals());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <NavAdminInvoice />
                
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/invoice/recurringInterval/create"
                            style={TableStyles.bgBlue}
                            icon={<AddIcon />}
                            name={t("dashboard.create_new")}
                        />
                        {/* <MagicLinkIcon
                            url="/dashboard"
                            style={TableStyles.bgBlue}
                            icon={<VerticalAlignBottomIcon />}
                            name={t("dashboard.import")}
                        /> */}

                        <br />
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getRecurringIntervals}
                                data={recurring_intervals}
                                columns={columns}
                                filename="recurring_intervals"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={recurring_intervals}
                                columns={columns}
                                loading={isLoading}
                                pageSize={pageSize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecurringInterval;
