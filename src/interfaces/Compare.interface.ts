import CompareElement from './CompareElement.interface';
import CompareStructure from './CompareStructure.interface';

export default interface Compare {
    structure: CompareStructure[]
    elements: CompareElement[]
}
