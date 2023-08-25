import { UseFieldArrayReturn } from 'react-hook-form';
import { FormContactValues } from '../../components/modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';

export type PhonesFormArray = UseFieldArrayReturn<FormContactValues, 'contacts.phones', any>;
export type EmailsFormArray = UseFieldArrayReturn<FormContactValues, 'contacts.emails', any>;
