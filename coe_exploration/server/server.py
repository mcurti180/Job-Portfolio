from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_apscheduler import APScheduler
from datetime import datetime
import bcrypt
  
# Initializing flask app
app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

# Set up the APScheduler to run in the background
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

# Configure the app for the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:bowleg.historic.TORI@database:3306/exploration'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning and to save resources
app.config['SECRET_KEY'] = 'super_secret_key'  # TODO: Shouldn't be hardcoded in the final version so move to an environment variable
 
 # Create the SQLAlchemy db instance
db = SQLAlchemy(app)

# Define the maximum number of interactions per day for each type
MAX_INTERACTIONS_PER_DAY = {'pet': 100, 'play': 50, 'feed': 30, 'wash': 10} # TODO: Change these values to lower numbers later

# TODO: Remove/Change the course stuff later
# All this course stuff was just to test out the database connection to the server
# so anybody can change/repurpose it if they want
class Course(db.Model):
    __tablename__ = 'Courses'
    CRN = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(255), nullable=False)
    course_description = db.Column(db.Text, nullable=False)
    credits = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'CRN': self.CRN,
            'course_name': self.course_name,
            'course_description': self.course_description,
            'credits': self.credits
        }


class Users(db.Model):
    __tablename__ = 'Users'
    userID = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def to_dict(self):
        return {
            'userID': self.userID,
            'username': self.username,
            'email': self.email,
        }

class Majors(db.Model):
    __tablename__ = 'Majors'
    majorID = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    majorName = db.Column(db.String(255), unique=True, nullable=False)
    majorDescription = db.Column(db.Text, nullable=False)
    careerProspects = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'majorID': self.majorID,
            'majorName': self.majorName,
            'majorDescription': self.majorDescription,
            'careerProspects': self.careerProspects
        }


class MajorInformation(db.Model):
    __tablename__ = 'MajorInformation'
    majorInfoID = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    majorID = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    #majorName = db.Column(db.String(255), nullable=False)
    topProfessor1 = db.Column(db.String(255), nullable=False)
    topProfessor2 = db.Column(db.String(255), nullable=False)
    topProfessor3 = db.Column(db.String(255), nullable=False)
    studentQuote1 = db.Column(db.Text, nullable=False)
    studentQuote2 = db.Column(db.Text, nullable=False)
    careers = db.Column(db.String(255), nullable=False)
    minors = db.Column(db.String(255), nullable=False)
    skills = db.Column(db.String(255), nullable=False)
    interests = db.Column(db.String(255), nullable=False)

    def to_dict(self):
         return {
            'majorID': self.majorID,
            #'majorName': self.majorName,
            'topProfessor1': self.topProfessor1,
            'topProfessor2': self.topProfessor2,
            'topProfessor3': self.topProfessor3,
            'studentQuote1': self.studentQuote1,
            'studentQuote2': self.studentQuote2,
            'careers': self.careers,
            'minors': self.minors,
            'skills': self.skills,
            'interests': self.interests
       }
    
class StudentQuotes(db.Model):
    __tablename__ = 'StudentQuotes'
    quoteID = db.Column(db.Integer, primary_key=True)
    majorid = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    quote = db.Column(db.Text, nullable=False)

class Skills(db.Model):
    __tablename__ = 'Skills'
    skillID = db.Column(db.Integer, primary_key=True)
    majorid = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    skill = db.Column(db.String(255), nullable=False)

class Interests(db.Model):
    __tablename__ = 'Interests'
    interestID = db.Column(db.Integer, primary_key=True)
    majorid = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    interest = db.Column(db.String(255), nullable=False)

class TopProfessors(db.Model):
    __tablename__ = 'TopProfessors'
    professorID = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    majorID = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    professorName = db.Column(db.String(255), nullable=False)
    professorURL = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'professorID': self.professorID,
            'majorID': self.majorID,
            'professorName': self.professorName,
            'professorURL': self.professorURL
        }

class Minors(db.Model):
    __tablename__ = 'Minors'
    minorID = db.Column(db.Integer, primary_key=True)
    majorid = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    minorName = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    
class Pets(db.Model):
    __tablename__ = 'Pets'
    petID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer, db.ForeignKey('Users.userID'), nullable=False)
    pet_name = db.Column(db.String(255), nullable=False)
    mood = db.Column(db.Enum('happy', 'sad', 'angry', 'neutral', 'excited', 'tired', 'curious'), default='neutral', nullable=False)
    love = db.Column(db.Integer, default=50)
    recreation = db.Column(db.Integer, default=30)
    hunger = db.Column(db.Integer, default=30)
    cleanliness = db.Column(db.Integer, default=100)
    outfitID = db.Column(db.Integer, db.ForeignKey('Rewards.rewardID'), nullable=True)
    showTooltips = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'pet_name': self.pet_name,
            'mood': self.mood,
            'love': self.love,
            'recreation': self.recreation,
            'hunger': self.hunger,
            'cleanliness': self.cleanliness,
            'outfitID': self.outfitID
        }

class PetInteractions(db.Model):
    __tablename__ = 'PetInteractions'
    PetInteractionsID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    petID = db.Column(db.Integer, db.ForeignKey('Pets.petID'), nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey('Users.userID'), nullable=False)
    interactionType = db.Column(db.Enum('pet', 'play', 'feed', 'wash'), nullable=False)
    interactionTime = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

class Rewards(db.Model):
    __tablename__ = 'Rewards'
    rewardID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    majorID = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    rewardName = db.Column(db.String(255), nullable=False)
    rewardDescription = db.Column(db.Text, nullable=False)
    rewardType = db.Column(db.Enum('outfit', 'cosmetic', 'mechanic'), nullable=False)

    def to_dict(self):
        return {
            'rewardID': self.rewardID,
            'majorID': self.majorID,
            'rewardName': self.rewardName,
            'rewardDescription': self.rewardDescription,
            'rewardType': self.rewardType
        }
    
class PetRewards(db.Model):
    __tablename__ = 'PetRewards'
    PetRewardID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    petID = db.Column(db.Integer, db.ForeignKey('Pets.petID'), nullable=False)
    rewardID = db.Column(db.Integer, db.ForeignKey('Rewards.rewardID'), nullable=False)
    isActive = db.Column(db.Boolean, default=False)
    timeReceived = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

class Words(db.Model):
    __tablename__ = 'Words'
    id = db.Column(db.Integer, primary_key=True)
    major_id = db.Column(db.Integer, db.ForeignKey('Majors.majorid'), nullable=False)
    word = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Words(id={self.id}, major_id={self.major_id}, word='{self.word}')>"

    def to_dict(self):
        return {
            'id': self.id,
            'major_id': self.major_id,
            'word': self.word
        }


# Create a route to query Courses and return the data (navigate to localhost:8000/courses)
@app.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([course.to_dict() for course in courses])
 
 
@app.route('/api/pet/interact', methods=['POST'])
@jwt_required() # This will require a valid access token to be present in the request to access this route
def interact_with_pet():
    current_user_id = get_jwt_identity()
    data = request.json
    interaction_type = data.get('interactionType')
    
    # Get the pet of the current user
    pet = Pets.query.filter_by(userID=current_user_id).first()
    if not pet:
        return jsonify({'message': 'Pet not found'}), 404
    
    # Check to make sure number of interactions per day is not exceeded for the interaction type
    today = datetime.now().date()
    interaction_count = PetInteractions.query.filter(PetInteractions.petID == pet.petID, PetInteractions.interactionType == interaction_type, db.func.date(PetInteractions.interactionTime) == today).count()
    print(f"There's been {interaction_count + 1} {interaction_type} interactions on {today} so far")

    if interaction_count >= MAX_INTERACTIONS_PER_DAY[interaction_type]:
        return jsonify({'message': 'Maximum daily interactions exceeded'}), 429

    # Execute the interaction
    match interaction_type:
        case 'pet':
            pet.love = min(pet.love + 2, 100)   # Clamp the values between 0 and 100
        case 'play':
            pet.recreation = min(pet.recreation + 10, 100)
            pet.love = min(pet.love + 3, 100)
            pet.cleanliness = max(pet.cleanliness - 30, 100)
        case 'feed':
            pet.hunger = max(pet.hunger - 40, 0)
            pet.cleanliness = max(pet.cleanliness - 10, 100)
        case 'wash':
            pet.cleanliness = 100
        case _: # Check if the interaction type is valid
            return jsonify({'message': 'Invalid interaction type'}), 404
    
    # Create a new interaction record
    new_interaction = PetInteractions(petID=pet.petID, userID=current_user_id, interactionType=interaction_type)

    # Update the pet's mood based on the new stats
    pet.mood = update_pet_mood(pet)
    
    # Save the changes to the database (don't need to add the pet to the session since it's already there)
    db.session.add(new_interaction)
    db.session.commit()

    return jsonify({'message': f'Successfully recorded {interaction_type} interaction with pet', 'pet': pet.to_dict()}), 200


def update_pet_mood(pet: Pets):
    """Updates the mood of the pet based on its stats and events (last exploration time, etc.)."""
    if pet.love > 80 and pet.recreation > 80 and pet.hunger < 20 and pet.cleanliness > 80:
        return 'happy'
    if pet.love < 20 and pet.recreation < 20 and pet.hunger > 80 and pet.cleanliness < 20: # TODO: Could also add a condition for if the pet hasn't been interacted with in a while
        return 'sad'
    
    # Angry mood: triggered when a user hasn't interacted with their pet in a while and their pet's stats are low
    if pet.love < 20 and pet.recreation < 20 and pet.hunger > 80 and pet.cleanliness < 50:
        last_interaction = PetInteractions.query.filter_by(petID=pet.petID).order_by(PetInteractions.interactionTime.desc()).first()
        print(f"Last interaction: {last_interaction}")
        if last_interaction:
            time_since_last_interaction = datetime.now() - last_interaction.interactionTime
            if time_since_last_interaction.total_seconds() > 48 * 3600:  # 48 hours
                return 'angry'
            
    # Excited mood: triggered when a user unlocks a reward from a major
    recent_reward = PetRewards.query.filter_by(petID=pet.petID).order_by(PetRewards.timeReceived.desc()).first()
    print(f"Recent reward: {recent_reward}")
    if recent_reward:
        time_since_reward = datetime.now() - recent_reward.timeReceived
        if time_since_reward.total_seconds() < 24 * 3600:  # 24 hours
            return 'excited'

    # Some ideas:
    # Angry mood is triggered when a user hasn't interacted with their pet in a while and their pet's stats are low
    # Excited is triggered when a user unlocks a reward from a major
    # Tired mood is triggered when a user has explored a major a lot in a short period of time and their pet's stats are low
    # Curious mood is triggered when a user hasn't explored a major in a while and they haven't already explored all the majors
    # Frustated mood is triggered when a user has tried to interact with their pet too many times in a day or they fail to complete a minigame

    # If none of the above conditions are met, return neutral mood
    return 'neutral'


@app.route('/api/pet/stats', methods=['GET'])
@jwt_required()
def get_pet_stats():
    """Get the stats of the current user's pet."""
    current_user_id = get_jwt_identity()
    pet = Pets.query.filter_by(userID=current_user_id).first()

    if not pet:
        return jsonify({'message': 'Pet not found'}), 404
    
    pet_stats = pet.to_dict()
    outfit = Rewards.query.filter_by(rewardID=pet.outfitID).first()
    outfit_name = outfit.rewardName if outfit else 'default'
    pet_stats['outfitID'] = pet.outfitID
    pet_stats['outfit'] = outfit_name
    pet_stats['showTooltips'] = pet.showTooltips
    print(pet_stats)
    
    return jsonify({'message': 'Pet stats retrieved successfully', 'petStats': pet_stats}), 200

@app.route('/api/pet/toggle-tooltips', methods=['POST'])
@jwt_required()
def toggle_tooltips():
    """Toggle the tooltip visibility for the current user's pet."""
    current_user_id = get_jwt_identity()
    pet = Pets.query.filter_by(userID=current_user_id).first()

    if not pet:
        return jsonify({'message': 'Pet not found'}), 404

    pet.showTooltips = not pet.showTooltips
    db.session.commit()

    return jsonify({'showTooltips': pet.showTooltips}), 200

@app.route('/api/pet/change-name', methods=['POST'])
@jwt_required()
def change_pet_name():
    """Change the name of the current user's pet."""
    current_user_id = get_jwt_identity()
    data = request.json
    new_name = data.get('newName')

    if not new_name:
        return jsonify({'message': 'New name is required'}), 400

    pet = Pets.query.filter_by(userID=current_user_id).first()
    if not pet:
        return jsonify({'message': 'Pet not found'}), 404

    pet.pet_name = new_name
    db.session.commit()

    return jsonify({'message': 'Pet name changed successfully'}), 200

@app.route('/api/pet/equip-outfit', methods=['POST'])
@jwt_required()
def equip_outfit():
    """Equip an outfit to the current user's pet."""
    current_user_id = get_jwt_identity()
    data = request.json
    reward_id = data.get('rewardId')
    print(f"Reward ID: {reward_id}")

    pet = Pets.query.filter_by(userID=current_user_id).first()
    if not pet:
        return jsonify({'message': 'Pet not found'}), 404

    if reward_id is None:
        # Set the outfit to default
        pet.outfitID = None
        db.session.commit()
        return jsonify({'message': 'Outfit set to default'}), 200

    reward = Rewards.query.filter_by(rewardID=reward_id).first()
    if not reward or reward.rewardType != 'outfit':
        return jsonify({'message': 'Invalid outfit reward'}), 400

    pet.outfitID = reward_id
    db.session.commit()

    return jsonify({'message': 'Outfit equipped successfully'}), 200


@app.route('/api/pet/toggle-cosmetic', methods=['POST'])
@jwt_required()
def toggle_cosmetic():
    """Toggle a cosmetic item for the current user's pet."""
    current_user_id = get_jwt_identity()
    data = request.get_json()
    reward_id = data.get('rewardId')
    is_active = data.get('isActive')    # What we want to set the isActive field to
    pet = Pets.query.filter_by(userID=current_user_id).first()
    
    if not pet:
        return jsonify({'message': 'Pet not found'}), 404
    
    pet_reward = PetRewards.query.filter_by(petID=pet.petID, rewardID=reward_id).first()
    if not pet_reward:
        return jsonify({'message': 'Reward not found for this pet'}), 404
    
    pet_reward.isActive = is_active

    print(f"Reward ID: {reward_id}, is active: {is_active}")

    db.session.commit()
    
    return jsonify({'message': 'Cosmetic item toggled successfully'}), 200

@app.route('/api/pet/rewards', methods=['GET'])
@jwt_required()
def get_pet_rewards():
    """Get all the earned rewards of the current user's pet."""
    current_user_id = get_jwt_identity()
    pet = Pets.query.filter_by(userID=current_user_id).first()

    if not pet:
        return jsonify({'message': 'Pet not found'}), 404

    pet_rewards = (db.session.query(PetRewards, Rewards)
                   .join(Rewards, PetRewards.rewardID == Rewards.rewardID)
                   .filter(PetRewards.petID == pet.petID)
                   .all())

    rewards_list = []           # List of all rewards this pet currently has
    active_reward_list = []     # List of all active rewards this pet currently has
    active_cosmetic_list = []   # List of all active cosmetic rewards this pet currently has
    for pet_reward, reward in pet_rewards:
        reward_data = reward.to_dict()
        reward_data['isActive'] = pet_reward.isActive
        rewards_list.append(reward_data)
        if pet_reward.isActive:
            active_reward_list.append(reward_data)
            if reward.rewardType == 'cosmetic':
                active_cosmetic_list.append(reward_data)

    # Identify active outfit
    active_outfit = pet.outfitID

    return jsonify({
        'message': 'Rewards retrieved successfully',
        'petName': pet.pet_name,
        'rewards': rewards_list,
        'activeOutfit': active_outfit,
        'activeRewards': active_reward_list,
        'activeCosmetics': active_cosmetic_list
    }), 200

@app.route('/api/pet/check-reward/<int:reward_id>', methods=['GET'])
@jwt_required()
def check_reward(reward_id):
    """Check if the current user's pet already has the reward with the specified ID. If not, add it to the pet's rewards."""
    current_user_id = get_jwt_identity()

    pet = Pets.query.filter_by(userID=current_user_id).first()
    if not pet:
        return jsonify({'message': 'Pet not found'}), 404
    
    # Get the reward type from the Rewards table
    reward = Rewards.query.filter_by(rewardID=reward_id).first()
    if not reward:
        return jsonify({'message': 'Reward not found'}), 404    

    # Check if the pet has the specified reward
    has_reward = PetRewards.query.filter_by(petID=pet.petID, rewardID=reward_id).first() is not None
    print(f"Has reward: {has_reward}")

    if not has_reward:
        # Check if the reward is a mechanic reward
        is_mechanic = reward.rewardType == 'mechanic'
        
        # If the pet doesn't have the reward, add it to the pet's rewards
        new_pet_reward = PetRewards(petID=pet.petID, rewardID=reward_id, isActive=is_mechanic)
        db.session.add(new_pet_reward)
        db.session.commit()
        #has_reward = True

    return jsonify({'hasReward': has_reward, 'rewardDescription': reward.rewardDescription}), 200


def degrade_pet_stats():
    """Periodically degrades the stats of all pets in the database."""
    with app.app_context(): # Need to create a new app context to access the database outside of a request from the frontend
        pets = Pets.query.all()
        for pet in pets:
            print(pet.to_dict())                    # TODO: Remove this line later
            pet.love = max(pet.love - 1, 0)
            pet.recreation = max(pet.recreation - 1, 0)
            pet.hunger = min(pet.hunger + 5, 100)
            pet.cleanliness = max(pet.cleanliness - 3, 0)
            print(pet.to_dict())

        db.session.commit()

@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'All fields are required'})

    existing_user = Users.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'})

    new_user = Users(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})


@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'})   # TODO: Change this to or add a 400 status code

    user = Users.query.filter_by(username=username).first()
    if user and user.check_password(password):
        # Create a new access token for the user
        access_token = create_access_token(identity=user.userID)

        # Check if the user has a pet, if not, create one
        pet = Pets.query.filter_by(userID=user.userID).first()
        if not pet:
            new_pet = Pets(userID=user.userID, pet_name='O\'Malley')    # Default pet name, can be changed later
            db.session.add(new_pet)
            db.session.commit()

        return jsonify({'message': 'Login successful', 'access_token': access_token, 'user': user.to_dict()})   # TODO: Change this to or add a 200 status code

    return jsonify({'message': 'Invalid username or password'}) # TODO: Change this to or add a 401 status code


@app.route('/api/majors', methods=['GET'])
def get_majors():
    majors = Majors.query.all()
    return jsonify([major.to_dict() for major in majors])

# TODO: Add a route to get professor information for a specific major
@app.route('/api/professors', methods=['GET'])
def get_professors():
    professors = TopProfessors.query.all()
    return jsonify([professor.to_dict() for professor in professors])

@app.route('/api/majors/majorinformation/<int:majorID>', methods=['GET'])
def get_majorInfo(majorID):
    major = Majors.query.get(majorID)

    if not major:
        return jsonify({'message': 'Major not found'}), 404
    
    # Get professors
    top_professors = TopProfessors.query.filter_by(majorID=majorID).all()

    # Get student quotes
    student_quotes = StudentQuotes.query.filter_by(majorid=majorID).all()

    # Get skills
    skills = Skills.query.filter_by(majorid=majorID).all()

    # Get interests
    interests = Interests.query.filter_by(majorid=majorID).all()

    # Get minors
    minors = Minors.query.filter_by(majorid=majorID).all()

    major_info = {
        'majorName': major.majorName,
        'majorDescription': major.majorDescription,
        'careerProspects': major.careerProspects,
        'topProfessors': [professor.to_dict() for professor in top_professors],
        'minors': [{'name': minor.minorName, 'message': minor.message} for minor in minors],
        'studentQuotes': [quote.quote for quote in student_quotes],
        'skills': [skill.skill for skill in skills],
        'interests': [interest.interest for interest in interests]
    }

    return jsonify({'message': 'Major information received successfully', 'majorInfo': major_info}), 200





@app.route('/api/majors/<int:major_id>/words', methods=['GET'])
def get_major_words(major_id):
    # Query the words associated with the specified major_id
    words = Words.query.filter_by(major_id=major_id).all()
    word_dicts = [word.to_dict() for word in words]

    return jsonify(word_dicts)




# Degrade the pet's stats every hour
scheduler.add_job(id='degrade_pet_stats', func=degrade_pet_stats, trigger='interval', hours=1)



@app.route('/api/debug/unlock-rewards', methods=['POST'])
@jwt_required()
def unlock_rewards():
    """Unlock all rewards for the current user's pet."""
    current_user_id = get_jwt_identity()
    pet = Pets.query.filter_by(userID=current_user_id).first()

    if not pet:
        return jsonify({'message': 'Pet not found'}), 404

    rewards = Rewards.query.all()
    for reward in rewards:
        pet_reward = PetRewards(petID=pet.petID, rewardID=reward.rewardID)
        print(pet_reward.rewardID)
        if not pet_reward:
            db.session.add(pet_reward)

    db.session.commit()

    return jsonify({'message': 'All rewards unlocked successfully'}), 200


# Running app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)