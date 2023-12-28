from abc import ABC, abstractmethod
from math import prod

def argmax(sequence):
    if not sequence:
        return None  # or raise an exception if sequence is empty
    return max(enumerate(sequence), key=lambda x: x[1])[0]

class DomainElement:
    def __init__(self, values):
        if type(values) is int:
            self.values = (values,)
        else:
            self.values = tuple(values)

    def __getitem__(self, index):
        return self.values[index]

    def __len__(self):
        return len(self.values)

    def __str__(self):
        s = "("
        for x in self.values:
            s += str(x) + ","
        s = s[:-1]
        return s + ")"

    def __eq__(self, obj):
        if isinstance(obj, DomainElement):
            return self.values == obj.values
        return False

    def __hash__(self):
        return hash(self.values)

    def __int__(self):
        return int(self.values[0])

    def ship_string(self):
        return str(self.values[0])

    @classmethod
    def of(cls, *values):
        return cls(values)


class IDomain():
    index: int
    values: list

    def __iter__(self):
        self.index = 0
        return self

    def __next__(self):
        if self.index < len(self.values):
            result = self.values[self.index]
            self.index += 1
            return result
        else:
            raise StopIteration

    def __str__(self):
        s = ""
        for x in self.values:
            s += str(x)
        return s

    def __eq__(self, obj):
        if self.values == obj.values:
            return True
        return False

    def __hash__(self):
        return hash(self.values)

    @abstractmethod
    def get_cardinality(self):
        pass

    @abstractmethod
    def get_component(self, index):
        pass

    @abstractmethod
    def number_of_components(self):
        pass

    @abstractmethod
    def index_of_element(self, element):
        pass

    @abstractmethod
    def element_for_index(self, index):
        pass


class Domain(IDomain):
    @staticmethod
    def int_range(start, end):
        return SimpleDomain(start, end)

    @staticmethod
    def combine(*domains):
        return CompositeDomain(*domains)

    @abstractmethod
    def get_cardinality(self):
        pass

    @abstractmethod
    def get_component(self, index):
        pass

    @abstractmethod
    def number_of_components(self):
        pass

    @abstractmethod
    def index_of_element(self, element):
        pass

    @abstractmethod
    def element_for_index(self, index):
        pass


class SimpleDomain(IDomain):
    def __init__(self, first, last):
        self.index = 0
        self.first = first
        self.last = last
        self.values = [DomainElement(x) for x in range(first, last, 1)]

    def get_cardinality(self):
        return self.last - self.first

    def get_component(self, index):
        if index != 0:
            raise IndexError("Index out of range for SimpleDomain.")
        return self

    def number_of_components(self):
        return 1

    def index_of_element(self, element):
        for i, e in enumerate(self.values):
            if e == element:
                return i
        raise ValueError(f"Element {element} not in domain.")

    def element_for_index(self, index):
        if 0 <= index < self.get_cardinality():
            return self.values[index]
        raise IndexError("Index out of range.")


class CompositeDomain(IDomain):
    def __init__(self, *domains):
        self.index = 0
        self.domains = domains
        self.values = [self.element_for_index(x) for x in range(self.get_cardinality())]

    def get_cardinality(self):
        return prod(d.get_cardinality() for d in self.domains)

    def get_component(self, index):
        return self.domains[index]

    def number_of_components(self):
        return len(self.domains)

    def index_of_element(self, element):
        index = 0
        for i, d in enumerate(self.domains):
            if d == element:
                break
        return index

    def element_for_index(self, index):
        result = []
        for d in reversed(self.domains):
            result.append(d.element_for_index(index % d.get_cardinality()))
            index //= d.get_cardinality()
        result.reverse()
        formated = [num for tup in result for num in tup]
        return DomainElement(formated)


class IFuzzySet(ABC):
    @abstractmethod
    def get_domain(self):
        pass

    @abstractmethod
    def get_value_at(self, domain_element):
        pass


class MutableFuzzySet(IFuzzySet):

    def __init__(self, domain):
        self.domain = domain
        self.membership = {element: 0.0 for element in self.domain}

    def __str__(self):
        self.index = 0
        s = ""
        for key, value in self.membership.items():
            s += str(key) + " : " + str(value) + "\n"
        return s

    def __iter__(self):
        self.index = 0
        self._iterator = iter(self.membership.items())
        return self

    def __next__(self):
        domain_element, membership_value = next(self._iterator)
        return domain_element, membership_value

    def set(self, domain_element, membership_value):
        if domain_element in self.membership:
            self.membership[domain_element] = membership_value
        return self

    def get_domain(self):
        return self.domain

    def get_value_at(self, domain_element):
        if domain_element not in self.membership:
            print("Key not found:", domain_element)
        return self.membership[domain_element]


class CalculatedFuzzySet(IFuzzySet):

    def __init__(self, domain, function):
        self.domain = domain
        self.function = function

    def __str__(self):
        s = ""
        for e in self.domain:
            s += (str(e) + " : " + str(self.get_value_at(e))) + "\n"
        return s + "\n"

    def get_domain(self):
        return self.domain

    def get_value_at(self, domain_element):
        return self.function(self.domain.index_of_element(domain_element))

    def get_domain_for_max_value(self):
        value = 1
        # TODO
        domain_elements_for_value = []
        for domain_element in self.domain:
            if self.get_value_at(domain_element) == value:
                domain_elements_for_value.append(domain_element)
        return domain_elements_for_value


class StandardFuzzySets:
    #1 na 0
    @staticmethod
    def i_function(a, b):
        return lambda x: 1 if x < a else (b - x) / (b - a) if a <= x < b else 0

    #0 na 1
    @staticmethod
    def gamma_function(a, b):
        return lambda x: 0 if x < a else (x - a) / (b - a) if a <= x < b else 1

    #trokut
    @staticmethod
    def lambda_function(a, b, c):
        return lambda x: 0 if x < a or x >= c else (x - a) / (b - a) if a <= x < b else (c - x) / (c - b)


    #trapez
    @staticmethod
    def trapezoid_function(a, b, c, d):
        return lambda x: (
            0 if x < a or x > d else
            (x - a) / (b - a) if a <= x < b else
            1 if b <= x <= c else
            (d - x) / (d - c) if c < x <= d else
            0
        )
class UnaryFunction():
    def __init__(self, func):
        self.func = func

    def value_at(self, value):
        return self.func(value)


class BinaryFunction():
    def __init__(self, func):
        self.func = func

    def value_at(self, value1, value2):
        return self.func(value1, value2)


class Operations:
    @staticmethod
    def unary_operation(set1, unary_function):
        result = MutableFuzzySet(set1.get_domain())
        for element in set1.get_domain():
            result.set(element, unary_function.value_at(set1.get_value_at(element)))
        return result

    @staticmethod
    def binary_operation(set1, set2, binary_function):
        result = MutableFuzzySet(set1.get_domain())
        for element in set1.get_domain():
            result.set(element, binary_function.value_at(set1.get_value_at(element), set2.get_value_at(element)))
        return result

    @staticmethod
    def zadeh_not():
        return UnaryFunction(lambda x: 1 - x)

    @staticmethod
    def multiply_by(a):
        return UnaryFunction(lambda x: a * x)

    @staticmethod
    def cap_at_max_value(a):
        return UnaryFunction(lambda x: x if x < a else a)

    @staticmethod
    def zadeh_and():
        return BinaryFunction(lambda x, y: x * y)

    @staticmethod
    def zadeh_or():
        return BinaryFunction(lambda x, y: max(x, y))

    @staticmethod
    def hamacher_t_norm(a):
        return BinaryFunction(lambda x, y: (x * y) / (a + (1 - a) * (x + y - x * y)))

    @staticmethod
    def hamacher_s_norm(a):
        return BinaryFunction(lambda x, y: (x + y - 2 * x * y) / (1 - a * (1 - x - y + x * y)))
