import { useParams } from "react-router-dom";

const ServiceDetails = ({ serv }) => {
  const { name } = useParams();

  return (
    <div>
      <h1>Service Details for: {name}</h1>
      <p>Here you can display more details about the {name} service.</p>
    </div>
  );
};

export default ServiceDetails;
