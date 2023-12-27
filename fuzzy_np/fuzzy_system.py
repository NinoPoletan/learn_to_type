from utils import StandardFuzzySets, CalculatedFuzzySet, SimpleDomain, DomainElement, Operations, MutableFuzzySet
import sys


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

    def slow_v(self,value):
        return self.slow().get_value_at(DomainElement(value))

    def medium_speed_v(self,value):
        return self.medium_speed().get_value_at(DomainElement(value))

    def fast_v(self,value):
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
        a = 40
        b = 50
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.i_function(a, b))

    def good(self):
        a = 45
        b = 65
        c = 85
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))
    def excellent(self):
        a = 80
        b = 90
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.gamma_function(a, b))

class FuzzyDifficulty:
    def __init__(self):
        self.domain = SimpleDomain(100, 200)

    def get_set_by_name(self, method_name):
        if hasattr(self, method_name):
            method = getattr(self, method_name)
            return method()
        else:
            raise AttributeError(f"No method named {method_name} found in {self.__class__.__name__}")


    def very_easy(self):
        a = 120
        b = 122
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.i_function(a, b))

    def easy(self):
        a = 118
        b = 130
        c = 142
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def medium(self):
        a = 138
        b = 150
        c = 162
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def hard(self):
        a = 158
        b = 170
        c = 182
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.lambda_function(a, b, c))

    def very_hard(self):
        a = 178
        b = 180
        return CalculatedFuzzySet(self.domain, StandardFuzzySets.gamma_function(a, b))



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

class FuzzyWordOutput:
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



def defuzzify_center_of_mass(aggregated_output, type_system):
    if type_system == "difficulty":
        error_log = open('diff_.log', 'a')
        gen = FuzzyOutputDifficulty()
    else:
        error_log = open('word_.log', 'a')
        gen = FuzzyWordOutput()

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
    print(centroid, file=sys.stderr)
    return centroid


def difficulty_control_system(S, D_W, ACC_G, ACC_W):
    s = FuzzySpeed()
    a = FuzzyAcc()
    d = FuzzyDifficulty()

    rules = {
        'easier': max(
        ),
        'stay': max(
 #           min(s.medium_speed_v(V),d.very_close_v(DK)),
        ),
        'harder': max(
            0,
  #          s.slow_v(V)
        ),
    }
    return defuzzify_center_of_mass(rules, "difficulty")


def word_control_system(S, D_W, ACC_G, ACC_W):
    s = FuzzySpeed()
    a = FuzzyAcc()
    d = FuzzyDifficulty()

    rules = {
        'okay': max(
        ),
        'improve': max(
 #           min(s.medium_speed_v(V),d.very_close_v(DK)),
        ),

    }
    return defuzzify_center_of_mass(rules, "word")





#type_rule = "sum"
#type_rule = "multiply"

#while True:
    #akcel = motor_control_system(L, LK, DK, D, V, S,type_rule)
    #kormilo = stear_control_system(L, LK, DK, D, V, S,type_rule)
    #akcel = "100"
    #print(akcel, kormilo, flush=True)