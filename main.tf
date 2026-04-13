provider "aws" {
  region = "us-east-1" # You can change this to your closest region
}

resource "aws_instance" "quiz_server" {
  ami           = "ami-0c55b159cbfafe1f0" # This is a basic Linux ID
  instance_type = "t2.micro"             # The free-tier eligible server

  tags = {
    Name = "PersonalityQuizServer"
  }
}