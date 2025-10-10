const data = {
    users: [
      {
        id: 'user-1',
        name: 'Sam',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&q=80',
        email: 'user',
        password: '123',
      },
      {
        id: 'user-2',
        name: 'Alice',
        avatar: 'https://plus.unsplash.com/premium_photo-1693000697560-a3f90545c792?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3N8ZW58MHx8MHx8fDA%3D',
        email: 'user2@example.com',
        password: 'mypassword',
      },
      {
        id: 'user-3',
        name: 'Charlie',
        avatar: 'https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.webp?b=1&s=170667a&w=0&k=20&c=TXCiY7rYEvIBd6ibj2bE-VbJu0rRGy3MlHwxt2LHt9w=',
        email: 'user3@domain.com',
        password: 'securepass',
      },
      {
        id: 'user-4',
        name: 'Dana',
        avatar: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A=',
        email: 'example4@mail.com',
        password: 'testpass456',
      },
      {
        id: 'user-5',
        name: 'Eve',
        avatar: 'https://images.unsplash.com/photo-1613005798967-632017e477c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D',
        email: 'demo5@example.com',
        password: 'password789',
      },
    ],
    posts: [
      {
        id: 'post-1',
        image: 'https://media.istockphoto.com/id/1700728948/photo/poor-wheelchair-user-receiving-free-food.webp?b=1&s=170667a&w=0&k=20&c=K4wCxWeEblDA-6HSPt3N1cg7QswFidnmK4TopirATZk=',
        title: 'Healthy Harvests',
        description: 'How to share your garden produce with friends and neighbors. Tips from the best community gardeners.',
      },
      { 
        id: 'post-2',
        image: 'https://media.istockphoto.com/id/1477471874/photo/prepared-meals-in-containers-sitting-on-a-shelf-in-a-fridge.webp?b=1&s=170667a&w=0&k=20&c=pemADu1ufV6_CGfBipBO_FSkyOusgd8V0Cia6JKBKzA=',
        title: 'Community Sharing',
        description: 'The importance of sharing within your community. Stories from those who have benefited the most.',
      },
      {
        id: 'post-3',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMHBhbnRyeXxlbnwwfHwwfHx8MA%3D%3D',
        title: 'Gardening Tips',
        description: 'Best practices for maintaining a healthy garden. Expert advice on soil, watering, and more.',
      },
      {
        id: 'post-4',
        image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=1100&q=80',
        title: 'Wild Harvests',
        description: 'Foraging for wild edibles in your area. How to do it safely and sustainably.',
      },
      {
        id: 'post-5',
        image: 'https://plus.unsplash.com/premium_photo-1678790910802-cc3088b48bb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG9sZCUyMGNvdWNoJTIwZm9yJTIwc2FsZXxlbnwwfHwwfHx8MA%3D%3D',
        title: 'Food Preservation',
        description: 'Techniques for preserving your harvest. From canning to drying, learn how to make your produce last.',
      },
      {
        id: 'post-6',
        image: 'https://media.istockphoto.com/id/1693385394/photo/close-up-of-rotten-tomatoes.webp?b=1&s=170667a&w=0&k=20&c=4XDAGiebqA_6q97ynlXLPeLO_hzjKObJrsKVnVt1KQ8=',
        title: 'Community Events',
        description: 'Upcoming events in your area for gardeners and sharers. Join in and be a part of the community.',
      },
      {
        id: 'post-7',
        image: 'https://media.istockphoto.com/id/1693385394/photo/close-up-of-rotten-tomatoes.webp?b=1&s=170667a&w=0&k=20&c=4XDAGiebqA_6q97ynlXLPeLO_hzjKObJrsKVnVt1KQ8=',
        title: 'Community Events',
        description: 'Upcoming events in your area for gardeners and sharers. Join in and be a part of the community.',
      },
      {
        id: 'post-8',
        image: 'https://media.istockphoto.com/id/1693385394/photo/close-up-of-rotten-tomatoes.webp?b=1&s=170667a&w=0&k=20&c=4XDAGiebqA_6q97ynlXLPeLO_hzjKObJrsKVnVt1KQ8=',
        title: 'Community Events',
        description: 'Upcoming events in your area for gardeners and sharers. Join in and be a part of the community.',
      },
    ],
  };

  module.exports = data;
  