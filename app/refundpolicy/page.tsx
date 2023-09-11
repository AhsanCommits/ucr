'use client';

import { useEffect, useState } from 'react';

const RefundPolicyPage = () => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <section className="section-style">
      <div className="container-style flex-col md:px-12 md:py-20 space-y-8">
        <h1 className="text-4xl font-bold text-gray-700 p-2 text-center">
          Refund Policy
        </h1>
        <ul className="space-y-4 p-2 text-left text-neutral-600 text-base font-light">
          <li>Effective Date: 8/4/2023</li>
          <li>
            <strong>1. Refund Eligibility:</strong>
            <li>
              a. Refunds are only available for orders that have not been
              initiated or processed.
            </li>
            <li>
              b. Once an order has been initiated, we are unable to process
              refunds for the services provided.
            </li>
          </li>
          <li>
            <strong>2. Initiation of Services:</strong>{' '}
            <li>
              a. An order is considered initiated once any of the following
              actions have taken place:
            </li>
          </li>
          <li>
            <li>Submission of required information for the service.</li>
            <li> Processing of payment for the requested service. </li>
            <li>
              Provision of access to any relevant online resources or tools.
            </li>
          </li>
          <li>
            <strong>3. Refund Requests:</strong>
            <li>
              a. To request a refund for an order that has not been initiated,
              please contact our customer support team at [Customer Support
              Email].
            </li>
            <li>
              b. Refund requests must include the order number and relevant
              details to help us process your request efficiently.
            </li>
          </li>
          <li>
            <strong>4. Processing Refunds:</strong>
            <li>
              a. Refund requests will be reviewed within [Number] business days
              from the date of receipt.
            </li>
            <li>
              b. If your refund request is approved, the refund will be issued
              using the same payment method used for the original purchase.
            </li>
          </li>
          <li>
            <strong>5. Non-Refundable Services:</strong>
            <li>
              a. Services that have been initiated or processed are
              non-refundable. This includes any services for which you have
              provided information, made payments, or accessed relevant
              resources.
            </li>
            <li>
              b. If the service has been initiated but not fully completed,
              partial refunds may be considered on a case-by-case basis.
            </li>
          </li>
          <li>
            <strong>6. Unforeseen Circumstances:</strong>
            <li>
              {' '}
              a. In cases where we are unable to fulfill the requested service
              due to unforeseen circumstances or technical issues on our end, we
              will either provide an alternative solution or issue a full
              refund.
            </li>
          </li>
          <li>
            <strong>7. Charebacks:</strong>
            <li>
              Customer agrees that no chargebacks will be issued prior to making
              contact with us to settle any disputes. We require written
              agreement to perform a chargeback. If a chargeback is issued
              without prior written agreement, the customer will be subject to
              reimburse us for all fees incurred during the dispute process. We
              reserve the right to pursue legal action if necessary to recover
              any fees owed. If a chargeback is approved, the amount will be
              credited back to the original payment method used for the
              purchase. Please allow up to 10 business days for the chargeback
              to be processed and for the funds to appear in your account. If
              you have any disputes or concerns about your purchase, please
              contact us before issuing a chargeback. We are committed to
              resolving any issues and ensuring that you are satisfied with your
              purchase.
            </li>
          </li>
          <li>
            <strong>8. Contact Us:</strong>
            <li>
              If you have questions or concerns regarding our refund policy or
              need assistance with a refund request, please contact us using our
              contact form.
            </li>
          </li>
          <li>
            <strong>9. Changes to Refund Policy:</strong>
            <li>
              We reserve the right to modify, amend, or update this Refund
              Policy at any time. We will notify you of any significant changes
              via the Website or other appropriate means.
            </li>
          </li>
          <li>
            By using the UCR.gg Website, you acknowledge that you have read,
            understood, and agreed to this Refund Policy. If you do not agree
            with any part of this Refund Policy, please refrain from using the
            Website and our services.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default RefundPolicyPage;
