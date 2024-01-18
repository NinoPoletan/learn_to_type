from utils import StandardFuzzySets, CalculatedFuzzySet, SimpleDomain, DomainElement, Operations, MutableFuzzySet, argmax
import sys
import json

class FuzzySpeed:
    def __init__(self):
        self.domain = SimpleDomain(0, 200)

    def get_set_by_name(self, method_name):
        if hasattr(self, method_name):
            method = getattr(self, method_name)
            return method()
        else:
            raise AttributeError(f"No method named {method_name} found in {self.__class__.__name__}")

    def slow(self):
        a = 30
        b = 35
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.i_function(a, b))

    def medium_speed(self):
        a = 30
        b = 50
        c = 70
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def fast(self):
        a = 65
        b = 75
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.gamma_function(a, b))

    def slow_(self, value):
        return self.slow().get_value_at(DomainElement(value))

    def medium_speed_(self, value):
        return self.medium_speed().get_value_at(DomainElement(value))

    def fast_(self, value):
        return self.fast().get_value_at(DomainElement(value))


class FuzzyAcc:
    def __init__(self):
        self.domain = SimpleDomain(0, 101)

    def get_set_by_name(self, method_name):
        if hasattr(self, method_name):
            method = getattr(self, method_name)
            return method()
        else:
            raise AttributeError(f"No method named {method_name} found in {self.__class__.__name__}")

    def bad(self):
        a = 30
        b = 42
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.i_function(a, b))

    def good(self):
        a = 40
        b = 67
        c = 92
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def excellent(self):
        a = 90
        b = 95
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.gamma_function(a, b))

    def bad_(self, value):
        return self.bad().get_value_at(DomainElement(value))

    def good_(self, value):
        return self.good().get_value_at(DomainElement(value))

    def excellent_(self, value):
        return self.excellent().get_value_at(DomainElement(value))


class FuzzyDifficulty:
    def __init__(self):
        self.domain = SimpleDomain(30, 200)

    def get_set_by_name(self, method_name):
        if hasattr(self, method_name):
            method = getattr(self, method_name)
            return method()
        else:
            raise AttributeError(f"No method named {method_name} found in {self.__class__.__name__}")

    def very_easy(self):
        a = 50
        b = 52
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.i_function(a, b))

    def easy(self):
        a = 50
        b = 65
        c = 80
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def medium(self):
        a = 75
        b = 90
        c = 105
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def hard(self):
        a = 100
        b = 125
        c = 150
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def very_hard(self):
        a = 145
        b = 160
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.gamma_function(a, b))

    def very_easy_(self, value):
        return self.very_easy().get_value_at(DomainElement(value))

    def easy_(self, value):
        return self.easy().get_value_at(DomainElement(value))

    def medium_(self, value):
        return self.medium().get_value_at(DomainElement(value))

    def hard_(self, value):
        return self.hard().get_value_at(DomainElement(value))

    def very_hard_(self, value):
        return self.very_hard().get_value_at(DomainElement(value))


class FuzzyOutputDifficulty:
    def __init__(self):
        self.domain = SimpleDomain(0, 101)

    def get_set_by_name(self, method_name):
        if hasattr(self, method_name):
            method = getattr(self, method_name)
            return method()
        else:
            raise AttributeError(f"No method named {method_name} found in {self.__class__.__name__}")

    def easier(self):
        a = 25
        b = 40
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.i_function(a, b))

    def stay(self):
        a = 30
        b = 50
        c = 80
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def harder(self):
        a = 60
        b = 75
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.gamma_function(a, b))

    def easier_(self, value):
        return self.easier().get_value_at(DomainElement(value))

    def stay_(self, value):
        return self.stay().get_value_at(DomainElement(value))

    def harder_(self, value):
        return self.harder().get_value_at(DomainElement(value))

    def fuzzy_string_output(self, value):
        strings = ["easier", "stay", "harder"]
        index = argmax([self.easier_(value), self.stay_(value), self.harder_(value)])
        return strings[index]


class FuzzyLetterOutput:
    def __init__(self):
        self.domain = SimpleDomain(0, 101)

    def get_set_by_name(self, method_name):
        if hasattr(self, method_name):
            method = getattr(self, method_name)
            return method()
        else:
            raise AttributeError(f"No method named {method_name} found in {self.__class__.__name__}")

    def okay(self):
        a = 50
        b = 70
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.i_function(a, b))

    def improve(self):
        a = 65
        b = 70
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.gamma_function(a, b))

    def okay_(self, value):
        return self.okay().get_value_at(DomainElement(value))

    def improve_(self, value):
        return self.improve().get_value_at(DomainElement(value))

    def fuzzy_string_output(self, value):
        value = int(value)
        strings = ["okay", "improve"]
        index = argmax([self.okay_(value), self.improve_(value)])
        return strings[index]


def defuzzify_center_of_mass(aggregated_output, type_system):
    if type_system == "word":
        error_log = open('diff_word_.log', 'a')
        gen = FuzzyOutputDifficulty()
    else:
        error_log = open('letter_.log', 'a')
        gen = FuzzyLetterOutput()

    sys.stderr = error_log
    result = MutableFuzzySet(gen.domain)

    for fuzzy_type_name, fuzzy_value in aggregated_output.items():
        fuzzy_type = gen.get_set_by_name(fuzzy_type_name)
        temp = Operations.unary_operation(fuzzy_type, Operations.multiply_by(fuzzy_value))
        result = Operations.binary_operation(result, temp, Operations.zadeh_or())

    numerator = 0.0
    denominator = 0.1
    for element in gen.domain:
        membership_value = result.get_value_at(element)
        numerator += int(element) * membership_value
        denominator += membership_value

    centroid = int(numerator / denominator)
    return centroid


def word_difficulty_control_system(S, D_W, ACC_G):
    s = FuzzySpeed()
    a = FuzzyAcc()
    d = FuzzyDifficulty()

    S, D_W, ACC_G = int(S), int(D_W), int(ACC_G)

    rules = {
        'easier': max(
            min(d.easy_(D_W), s.slow_(S), a.bad_(ACC_G)),
            min(d.easy_(D_W), s.slow_(S), a.good_(ACC_G)),

            min(d.medium_(D_W), s.slow_(S), a.bad_(ACC_G)),
            min(d.medium_(D_W), s.slow_(S), a.good_(ACC_G)),
            min(d.medium_(D_W), s.medium_speed_(S), a.bad_(ACC_G)),


            min(d.hard_(D_W), s.slow_(S), a.bad_(ACC_G)),
            min(d.hard_(D_W), s.slow_(S), a.good_(ACC_G)),
            min(d.hard_(D_W), s.medium_speed_(S), a.bad_(ACC_G)),


            min(d.very_hard_(D_W), s.slow_(S), a.bad_(ACC_G)),
            min(d.very_hard_(D_W), s.slow_(S), a.good_(ACC_G)),
            min(d.hard_(D_W), s.medium_speed_(S), a.bad_(ACC_G)),


        ),
        'stay': max(
            0.1,
            0.1,
            #min(d.very_easy_(D_W), s.medium_speed_(S), a.good_(ACC_G)),
            #min(d.easy_(D_W), s.medium_speed_(S), a.good_(ACC_G)),
            #min(d.medium_(D_W), s.medium_speed_(S), a.good_(ACC_G)),
            #min(d.hard_(D_W), s.medium_speed_(S), a.good_(ACC_G)),
            #min(d.very_hard_(D_W), s.medium_speed_(S), a.good_(ACC_G)),
        ),
        'harder': max(
            min(d.very_easy_(D_W), s.fast_(S), a.good_(ACC_G)),
            min(d.very_easy_(D_W), s.fast_(S), a.excellent_(ACC_G)),
            min(d.very_easy_(D_W), s.medium_speed_(S), a.excellent_(ACC_G)),

            min(d.easy_(D_W), s.fast_(S), a.good_(ACC_G)),
            min(d.easy_(D_W), s.fast_(S), a.excellent_(ACC_G)),
            min(d.easy_(D_W), s.medium_speed_(S), a.excellent_(ACC_G)),

            min(d.medium_(D_W), s.fast_(S), a.excellent_(ACC_G)),
            min(d.medium_(D_W), s.medium_speed_(S), a.excellent_(ACC_G)),

            min(d.hard_(D_W), s.fast_(S), a.excellent_(ACC_G)),
        ),
    }
    od = FuzzyOutputDifficulty()
    return od.fuzzy_string_output(defuzzify_center_of_mass(rules, "word"))


def letter_control_system(acc_l):
    a = FuzzyAcc()

    acc_l = int(acc_l)

    rules = {
        'okay': max(
            a.good_(acc_l),
            a.excellent_(acc_l)
        ),
        'improve': max(
            0,
            a.bad_(acc_l)
        ),

    }
    lo = FuzzyLetterOutput()

    return lo.fuzzy_string_output(defuzzify_center_of_mass(rules, "letter"))


def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError:
        print("Error: The file is not a valid JSON.")
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def run_whole_control_system_file():
    json_object = read_json_file("input_sample.json")
    S, D_W, ACC_G, ACC_L = json_object['speed'], json_object['difficulty_word'], json_object['accuracy_global'], json_object['accuracy_letters']
    output_word_diff = word_difficulty_control_system(S, D_W, ACC_G)

    output_letter_dict = {}
    for letter, acc in ACC_L.items():
        output_letter_dict[letter] = letter_control_system(acc)

    return output_word_diff, output_letter_dict


def run_whole_control_system_json(input_json):
    S, D_W, ACC_G, ACC_L = input_json['speed'], input_json['difficulty_word'], input_json['accuracy_global'], input_json['accuracy_letters']
    output_word_diff = word_difficulty_control_system(S, D_W, ACC_G)

    output_letter_dict = {}
    for letter, acc in ACC_L.items():
        output_letter_dict[letter] = letter_control_system(acc)

    return output_word_diff, output_letter_dict


if __name__ == '__main__':
    print(run_whole_control_system_file())
