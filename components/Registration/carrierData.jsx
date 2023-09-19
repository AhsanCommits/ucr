import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const CarrierData = ({ formDataEmail, carrierData, page, setPage }) => {
  const onSubmit = () => {
    setPage(page + 1);
  };

  return (
    <Form>
      <form onSubmit={onSubmit} className="space-y-8">
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

        <div className="text-left">
          <Button
            type="submit"
            className="md:w-1/2 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7 "
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CarrierData;
