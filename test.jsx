const form = useForm({
  resolver: zodResolver(formSchemaForRegistrationForm),
  defaultValues: {
    usDotNumber: '',
    email: '',
    terms: false,
    motorCarrier: false,
    motorPrivateCarrier: false,
    freightForwarder: false,
    broker: false,
    leasingCompany: false,
    certificationNeeded: '',
    processingTime: '',
    registrationYear: '',
    fullName: '',
    signature: '',
    checkAuthorization: false,
  },
});
