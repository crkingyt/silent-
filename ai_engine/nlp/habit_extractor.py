import re

class HabitExtractor:
    def __init__(self):
        self.smoking_keywords = ["smoke", "cigarette", "tobacco", "cigar", "vape", "nicotine"]
        self.alcohol_keywords = ["drink", "alcohol", "beer", "wine", "whiskey", "vodka", "cocktail", "drunk"]
        self.stress_keywords = ["stress", "anxious", "worry", "panic", "tension", "overwhelmed", "deadline"]
        self.sleep_keywords = ["sleep", "insomnia", "tired", "awake", "nightmare", "rest"]

    def analyze_text(self, text):
        """
        Analyzes text for health-related keywords and sentiment indicators.
        Includes basic negation handling to avoid false positives (e.g., "I do not smoke").
        """
        text = text.lower()
        
        # Helper to check for negation within a small window before the keyword
        def is_negated(keyword, text, window=3):
            words = text.split()
            try:
                # Find all indices of the keyword
                indices = [i for i, x in enumerate(words) if keyword in x]
                for idx in indices:
                    # Check previous 'window' words for negation terms
                    start = max(0, idx - window)
                    preceding_words = words[start:idx]
                    if any(neg in preceding_words for neg in ["no", "not", "don't", "dont", "never", "stop", "stopped", "quit"]):
                        return True
            except ValueError:
                pass
            return False

        detected_habits = []
        
        # Check Smoking
        smoking_found = False
        for word in self.smoking_keywords:
            if word in text:
                if not is_negated(word, text):
                    smoking_found = True
                    break
        if smoking_found:
            detected_habits.append("Smoking")
        
        # Check Alcohol
        alcohol_found = False
        for word in self.alcohol_keywords:
            if word in text:
                if not is_negated(word, text):
                    alcohol_found = True
                    break
        if alcohol_found:
            detected_habits.append("Alcohol Consumption")
            
        stress_score = 0
        for word in self.stress_keywords:
            if word in text:
                # Stress is usually present even if negated ("I am not stressed" is rare in these logs, 
                # but "I am not worried" might happen. Let's apply negation too.)
                if not is_negated(word, text):
                    stress_score += 1
        
        sleep_issues = False
        for word in self.sleep_keywords:
            if word in text:
                # "I sleep well" vs "I cannot sleep"
                # This is tricky with simple negation. 
                # "Sleep" keyword: "I sleep well" (Positive) vs "No sleep" (Negative).
                # If keyword is "insomnia", negation "no insomnia" is good.
                # If keyword is "sleep", negation "no sleep" is bad.
                # Simplified logic: If "insomnia", "nightmare", "tired" -> Issue.
                # If "sleep" -> Check if negated ("no sleep", "can't sleep").
                if word in ["insomnia", "nightmare", "tired", "awake"]:
                     if not is_negated(word, text):
                         sleep_issues = True
                elif word == "sleep":
                    # If "sleep" is negated ("no sleep"), it's an issue
                    if is_negated(word, text):
                        sleep_issues = True
        
        return {
            "detected_habits": detected_habits,
            "stress_indicators": stress_score,
            "sleep_issues_detected": sleep_issues,
            "sentiment_score": "Negative" if stress_score > 0 else "Neutral"
        }

habit_extractor = HabitExtractor()
