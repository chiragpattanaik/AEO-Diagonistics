def parse_response(response_text: str, target_brand: str) -> dict:
    lines = [l.strip() for l in response_text.strip().split("\n") if l.strip()]
    ranked = False
    position = None
    mention = None
    rank_counter = 0

    for line in lines:
        if line and line[0].isdigit():
            rank_counter += 1
            if target_brand.lower() in line.lower():
                ranked = True
                position = rank_counter
                mention = line
                break

    return {
        "ranked": ranked,
        "position": position,
        "mention": mention,
        "fullResponse": response_text,
        "error": False
    }
