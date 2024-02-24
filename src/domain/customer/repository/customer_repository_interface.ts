import Customer from "../entity/customer";
import RepositoryInterface from "../../shared/repository/repository_interface";
import CustomerInterface from "../entity/customer_interface";

export default interface CustomerRepositoryInterface extends RepositoryInterface<CustomerInterface> {}