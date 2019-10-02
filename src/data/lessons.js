const lessons = [
  {
    'metadata': {
      'id':'1',
      'term':'',
      'faculty': '',
      'courseNumber': '',
      'courseTitle': '',
      'date': '',
      'time': '',
      'duration': '',
      'librarian': '',
      'coInstructor': '',
      'studentCount': ''
    },
    'details': {
      'assignment': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil aut praesentium voluptatibus, consectetur perspiciatis enim quo repudiandae.',
      'learningOutcomesLevel': '',
      'learningOutcomes': [
        {
          'id':'1',
          'order': '1',
          'descriptionId': '4'
        },
        {
          'id':'2',
          'order': '2',
          'descriptionId': '6'
        },
        {
          'id':'3',
          'order': '3',
          'descriptionId': '7'
        }
      ]
    },
    'informationLiteracyObjectives': [ 2, 5, 7, 9 ],
    'thresholdConcepts': [ 3, 6, 7, 8],
    'resourcesUsed': [
      {
        'id': 1,
        'name': 'Book'
      },
      {
        'id': 2,
        'name': 'Video'
      }
    ],
    'handouts': [
      {
        'id': 1,
        'file': 'file-location.pdf'
      },
      {
        'id': 2,
        'file': 'file-location.pdf'
      }
    ],
    'instruction': [
      {
        'id': 1,
        'order': 1,
        'instructionCategory': 'existing',
        'instructionId': 4,
        'time': 10,
        'instructionDetails': [
          {
            'id': 1,
            'order': 1,
            'description': '...'
          }
        ]
      },
      {
        'id': 2,
        'order': 2,
        'instructionCategory': 'existing',
        'instructionId': 6,
        'time': 10,
        'instructionDetails': [
          {
            'id': 1,
            'order': 1,
            'description': '...'
          }
        ]
      },
      {
        'id': 3,
        'order': 3,
        'instructionCategory': 'existing',
        'instructionId': 7,
        'time': 10,
        'instructionDetails': [
          {
            'id': 1,
            'order': 1,
            'description': '...'
          }
        ]
      },
      {
        'id': 4,
        'order': 4,
        'instructionCategory': 'existing',
        'instructionId': 11,
        'time': 10,
        'instructionDetails': [
          {
            'id': 1,
            'order': 1,
            'description': '...'
          }
        ]
      },
      {
        'id': 5,
        'order': 5,
        'instructionCategory': 'custom',
        'instructionId': 0,
        'time': 10,
        'instructionDetails': [
          {
            'id': 1,
            'order': 1,
            'description': '...'
          }
        ]
      }
    ]
  }
]

export default lessons