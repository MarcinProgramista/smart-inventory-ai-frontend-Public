export default function ContactDetails({ contact, action }) {
  return (
    <>
      <div>{action} </div>
      <div>id: {contact.id}</div>
      <div>
        {contact.first_name} {contact.last_name}{" "}
      </div>
      <div>{contact.email}</div>
      <div>{contact.mobile_phone}</div>
      <div>{contact.role}</div>
    </>
  );
}
