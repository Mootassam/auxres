
import React, { useMemo, useState, useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { QRCodeCanvas } from "qrcode.react";
import FieldFormItem from "src/shared/form/FieldFormItem";
import actions from "src/modules/deposit/form/depositFormActions";
import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';
import selectorsDeposit from 'src/modules/deposit/form/depositFormSelectors';
import method from 'src/modules/depositMethod/list/depositMethodListActions'
import SuccessModalComponent from "src/view/shared/modals/sucessModal";

// Minimum deposit amounts for each network
const MIN_DEPOSIT_AMOUNTS = {
  USDT: 30,
  SOL: 0.232,
  BTC: 0.00087,
  ETH: 0.0071,
  XRP: 16.9
};

// Dynamic schema creation based on selected network
const createSchema = (selectedNetwork) => {
  const minAmount = MIN_DEPOSIT_AMOUNTS[selectedNetwork?.toUpperCase()] || 0;
  return yup.object().shape({
    orderno: yupFormSchemas.string(i18n("entities.deposit.fields.orderno")),
    amount: yupFormSchemas.decimal(i18n("entities.deposit.fields.amount"), {
      required: true,
      min: minAmount
    }),
    txid: yupFormSchemas.string(i18n("pages.deposit.fields.txid"), {
      required: true,
    }),
    rechargechannel: yupFormSchemas.string(
      i18n("entities.deposit.fields.rechargechannel")
    ),
  });
};

function Deposit() {
  const dispatch = useDispatch();
  const [selectedNetwork, setSelectedNetwork] = useState("USDT");
  const [amount, setAmount] = useState('');
  const [showToast, setShowToast] = useState(false);
  const listMethod = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const selectDepositModal = useSelector(selectorsDeposit.selectDepositModal);

  // Initialize currentAddress safely
  const [currentAddress, setCurrentAddress] = useState(
    listMethod?.[0]?.address || ""
  );

  // Fix success modal logic
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Update schema when network changes
  const schema = useMemo(() => createSchema(selectedNetwork), [selectedNetwork]);

  const [initialValues] = useState(() => {
    return {
      orderno: "",
      amount: "",
      txid: "",
      rechargechannel: "",
      rechargetime: "",
      status: "pending",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // Update address when network changes or listMethod updates
  useEffect(() => {
    if (listMethod && listMethod.length > 0) {
      const network = listMethod.find(n => n.symbol === selectedNetwork);
      if (network) {
        setCurrentAddress(network.address);
      } else if (listMethod[0]) {
        // Fallback to first network if selected not found
        setSelectedNetwork(listMethod[0].symbol);
        setCurrentAddress(listMethod[0].address);
      }
    }
  }, [selectedNetwork, listMethod]);

  // Copy address to clipboard with error handling
  const copyAddressToClipboard = () => {
    if (!currentAddress) {
      console.error("No address to copy");
      return;
    }

    navigator.clipboard.writeText(currentAddress).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }).catch(err => {
      console.error("Failed to copy address: ", err);
    });
  };

  const onSubmit = (values) => {
    if (!selectedNetwork) {
      console.error("No network selected");
      return;
    }

    // Generate order number in format: RE + YYYYMMDD + 7 random digits
    const now = new Date();

    // Format date as YYYYMMDD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    // Generate 7 random digits
    const randomDigits = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, "0");

    // Create order number
    values.orderno = `RE${dateStr}${randomDigits}`;

    // Set recharge time to current date and time
    values.rechargetime = now.toISOString();

    values.rechargechannel = selectedNetwork;
    setAmount(values.amount);

    dispatch(actions.doCreate(values));

    // Reset form fields after submission
    form.reset({
      orderno: "",
      amount: "",
      txid: "",
      rechargechannel: "",
      rechargetime: "",
      status: "pending",
    });
  };

  const selectedNetworkData = useMemo(
    () => listMethod?.find((network) => network.symbol === selectedNetwork) || null,
    [selectedNetwork, listMethod]
  );

  const handleCloseModal = () => {
    dispatch(actions.doClose());
    setAmount(''); // Clear amount
  };

  // Handle network selection
  const handleNetworkSelect = (event) => {
    setSelectedNetwork(event.target.value);
    // Clear amount field when network changes to avoid validation issues
    form.setValue("amount", "");
    form.clearErrors("amount");
  };

  // Get minimum amount for current network
  const getMinAmount = () => {
    return MIN_DEPOSIT_AMOUNTS[selectedNetwork?.toUpperCase()] || 0;
  };

  // Safe network display name
  const getNetworkDisplayName = () => {
    return selectedNetworkData?.name || selectedNetwork || i18n("pages.deposit.unknownNetwork");
  };

  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title={i18n("pages.deposit.title")} />

      {/* Network Selection */}
      {loading && <p>{i18n("pages.deposit.loading")}</p>}

      {!loading && listMethod && listMethod.length > 0 && (
        <>
          <div className="networkSection">
            <div className="sectionHeading">{i18n("pages.deposit.selectNetwork")}</div>
            <div className="networkDropdownContainer">
              <select
                className="networkDropdown"
                value={selectedNetwork}
                onChange={handleNetworkSelect}
                aria-label={i18n("pages.deposit.selectNetwork")}
              >
                {listMethod.map((network) => (
                  <option key={network.symbol} value={network.symbol}>
                    {network.name}
                  </option>
                ))}
              </select>
              <div className="networkDropdownIcon">
                <img
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${selectedNetwork}.png`}
                  style={{ width: 25, height: 25 }}
                  alt={selectedNetwork}
                />
              </div>
            </div>
          </div>

          {/* QR Code Section - Only show if we have an address */}
          {currentAddress && (
            <div className="qrSection">
              <QRCodeCanvas
                value={currentAddress}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
                className="qrBox"
              />
              <div className="addressSection">
                <div className="addressLabel">{i18n("pages.deposit.depositAddress")}</div>
                <div className="addressText" id="walletAddress">
                  {currentAddress}
                </div>
                <button
                  type="button"
                  className="copyBtn"
                  onClick={copyAddressToClipboard}
                  disabled={!currentAddress}
                >
                  <i className="fas fa-copy" /> {i18n("pages.deposit.copyAddress")}
                </button>
              </div>
            </div>
          )}

          {/* Form Section */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="amountSection">
                <FieldFormItem
                  name="amount"
                  label={i18n("pages.deposit.amountLabel", selectedNetwork.toUpperCase())}
                  className="textField"
                  className1="inputField"
                  className2="inputLabel"
                  className3="inputWrapper"
                  placeholder={i18n("pages.deposit.amountPlaceholder", getMinAmount(), selectedNetwork.toUpperCase())}
                />

                <FieldFormItem
                  name="txid"
                  type="text"
                  label={i18n("pages.deposit.txidLabel")}
                  className="textField"
                  className1="inputField"
                  className2="inputLabel"
                  className3="inputWrapper"
                  placeholder={i18n("pages.deposit.txidPlaceholder")}
                />
              </div>

              {/* Minimum Amount Warning */}
              <div className="minAmountWarning">
                <i className="fas fa-info-circle" />
                {i18n("pages.deposit.minimumDeposit")}: <strong>{getMinAmount()} {selectedNetwork.toUpperCase()}</strong>
              </div>

              {/* Warning Section */}
              <div className="warningBox">
                <div className="warningHeader">
                  <i className="fas fa-exclamation-circle warningIcon" />
                  <div className="warningTitle">{i18n("pages.deposit.importantNotice")}</div>
                </div>
                <div className="warningContent">
                  {i18n("pages.deposit.warningMessage")}
                </div>
              </div>

              {/* Deposit Button */}
              <button
                type="submit"
                className="depositBtn"
                disabled={!form.formState.isValid || !currentAddress}
              >
                {i18n("pages.deposit.confirmDeposit")}
              </button>
            </form>
          </FormProvider>

          {/* Network Details */}
          <div className="networkDetails">
            <div className="detailRow">
              <div className="detailLabel">{i18n("pages.deposit.network")}</div>
              <div className="detailValue" id="detailNetwork">
                {getNetworkDisplayName()} ({selectedNetwork.toUpperCase()})
              </div>
            </div>
            <div className="detailRow">
              <div className="detailLabel">{i18n("pages.deposit.minimumDeposit")}</div>
              <div className="detailValue">{getMinAmount()} {selectedNetwork.toUpperCase()}</div>
            </div>
            <div className="detailRow">
              <div className="detailLabel">{i18n("pages.deposit.estimatedArrival")}</div>
              <div className="detailValue">{i18n("pages.deposit.networkConfirmations")}</div>
            </div>
            <div className="detailRow">
              <div className="detailLabel">{i18n("pages.deposit.processingTime")}</div>
              <div className="detailValue">{i18n("pages.deposit.processingTimeValue")}</div>
            </div>
          </div>
        </>
      )}

      {/* Show message if no deposit methods available */}
      {!loading && (!listMethod || listMethod.length === 0) && (
        <div className="no-methods-message">
          {i18n("pages.deposit.noMethods")}
        </div>
      )}

      {/* Toast Notification */}
      <div className={`toastMsg ${showToast ? 'visible' : ''}`} id="toast">
        {i18n("pages.deposit.addressCopied")}
      </div>

      {selectDepositModal && (
        <SuccessModalComponent
          isOpen={selectDepositModal}
          onClose={handleCloseModal}
          type='deposit'
          amount={amount}
          coinType={selectedNetwork}
        />
      )}


      <style>{`
 
`}</style>
    </div>
  );
}

export default Deposit;