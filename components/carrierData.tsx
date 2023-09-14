const CarrierData: React.FC<{ formDataEmail: string; carrierData: any }> = ({
  formDataEmail,
  carrierData,
}) => {
  return (
    <div className="space-y-8">
      <p>Company Name: {carrierData.legalName}</p>
      <p>
        Company Address:{' '}
        {`${carrierData.phyStreet}, ${carrierData.phyCity}, ${carrierData.phyState}, ${carrierData.phyZipcode}`}
      </p>
      <p>DOT Number: {carrierData.dotNumber}</p>
      <p>Email Address: {formDataEmail}</p>
      <p>Number of Power Units: {carrierData.totalPowerUnits} </p>
    </div>
  );
};

export default CarrierData;
