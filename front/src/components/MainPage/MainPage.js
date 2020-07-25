import React, {Component} from 'react';
import pictures from '../../icons/profile.png';
import {Link} from "react-router-dom";

export default class MainPage extends Component {

    render() {
        let arr = [
            {
                nick: 'Petya',
                ava: null,
                title: 'JAVA',
                text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur nam delectus reprehenderit atque harum, id vitae odit, nihil ex quos cupiditate rem quae ipsam voluptatum omnis maiores. Laborum fugit distinctio saepe nam cumque veritatis modi maxime vel, illo rem vitae officia ipsa tempora. Deserunt eveniet ratione iusto libero unde maiores, debitis incidunt consequatur neque facilis nisi aspernatur repellat magni molestias eum cumque, distinctio voluptates expedita. At tenetur reprehenderit obcaecati quibusdam saepe asperiores totam iusto illum in? Fugit, ex, incidunt delectus eum, iusto vitae consectetur earum distinctio corrupti officia aliquid unde voluptas praesentium. Soluta ad maiores ullam dolores inventore, officia et? Labore exercitationem similique nam nobis? Repudiandae esse ut iste provident! Quos, eos sint quam illum cupiditate magnam voluptates qui, iste quaerat at necessitatibus itaque nihil voluptas natus eveniet molestias quis, quas expedita earum maxime ab! Suscipit voluptas numquam vel atque voluptatibus. Eum alias necessitatibus eos earum voluptas nemo commodi dolor ducimus magni dicta officia ad, velit perferendis suscipit, sunt neque! Maxime ipsum odio voluptatibus sequi distinctio dicta, nisi repellendus totam exercitationem adipisci pariatur eaque error corrupti dolores aliquam, qui quam excepturi? In odit dolorum, nisi laboriosam, fuga, fugiat similique soluta esse culpa dignissimos quis recusandae officiis impedit rem veritatis? Repellendus nobis enim suscipit eveniet quos modi aliquid nam culpa, quae temporibus repudiandae, sit necessitatibus ea quis ipsam autem vitae nisi aperiam? Natus corporis libero maxime, cupiditate harum quae pariatur eligendi dolorem qui, magni est eaque deleniti reprehenderit obcaecati quisquam impedit consequatur tenetur animi laboriosam quis facere sapiente optio. Esse voluptatum provident fugiat? Nulla expedita excepturi doloribus necessitatibus suscipit. Unde praesentium eaque fugit at voluptatem officia nulla tempore et, rem minus! Ratione, totam quam. Dolorum, eaque esse nulla dolores labore distinctio totam expedita, pariatur suscipit nemo recusandae exercitationem fugiat. Velit reprehenderit voluptatibus omnis unde iure aperiam similique vitae quis laborum architecto!',
                postId: '144',
                userId: '11'
            },
            {
                nick: 'Vasya',
                ava: null,
                title: 'Python',
                text:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas autem aut recusandae nesciunt minus repellat iure non vitae ut illo nam, labore at sapiente blanditiis unde deserunt tempora, ratione, hic amet. Ipsa, explicabo quaerat expedita laborum voluptatem delectus quo, autem dignissimos at nisi facilis assumenda aperiam corporis pariatur? Dolorem perspiciatis obcaecati corrupti iusto laboriosam doloribus eligendi accusamus voluptatibus nisi molestiae ut aperiam quos veritatis fugiat, autem animi repellat, atque distinctio corporis tenetur enim esse possimus hic! Eaque repellendus hic ducimus corporis numquam fugiat accusamus explicabo consequatur. Nisi, facilis ab? Dignissimos minima modi laboriosam quod ex debitis assumenda! Fugit optio unde facere hic vero velit magni, illum tempore illo temporibus alias, ea harum quos recusandae! Non debitis, facilis, commodi id nihil quis minima, dolorem et libero numquam perspiciatis at quae sapiente. Neque animi sapiente magnam dignissimos! Aspernatur ipsam sed nisi fugiat at assumenda repellendus, earum dolor. Odio inventore nemo doloribus vitae provident commodi fugit pariatur tenetur maiores. Quibusdam ut, alias harum illum natus repudiandae deleniti libero veniam optio itaque quam dolorum placeat sint et vero, tempore nesciunt, voluptatibus doloremque eos minima? Esse ab doloremque pariatur laborum, eveniet temporibus dignissimos impedit accusamus totam, quod sit exercitationem accusantium in voluptas praesentium, mollitia architecto!',
                postId: '2345645',
                userId: '22'
            },
            {
                nick: 'Nadya',
                ava: null,
                title: 'JS',
                text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quis, praesentium odio, laudantium totam optio consectetur, iste cupiditate vel iusto dolorum nesciunt possimus! Laboriosam ea labore quo eos temporibus aspernatur vel qui quos. Iusto quod nesciunt sit fuga culpa, earum ipsum sunt ex et eos. Distinctio magnam, et ullam fugit sequi inventore aspernatur iusto sit cum iste, magni id doloremque! Beatae, laborum harum eius quas reiciendis voluptas veniam? In assumenda placeat cumque debitis repudiandae nesciunt earum porro dicta reprehenderit odio, ut, accusantium quas! Doloribus, facilis minus quidem quo voluptates aut aspernatur sequi aperiam tempore animi quos vero at exercitationem officiis atque ipsam accusamus sed culpa excepturi, velit explicabo doloremque aliquid cupiditate. Beatae aperiam totam quibusdam aut. Laboriosam eaque molestiae vel tenetur eligendi placeat? Magnam architecto ratione reprehenderit qui. Et dolor sed eveniet, alias hic ratione corrupti veniam repudiandae dolorem quisquam enim excepturi cumque. Perferendis vero repellat doloremque, neque deserunt aut doloribus ullam aspernatur quia vel nisi placeat asperiores sit, quasi distinctio labore cum? Voluptatum, reprehenderit sequi similique vero in minima, esse nihil accusantium sunt omnis autem, porro voluptate fugit. Maxime, error aspernatur in soluta fuga culpa id excepturi architecto provident tenetur laborum necessitatibus sunt aliquam esse accusantium, illo iusto ipsum consequuntur beatae perspiciatis amet est eligendi. Eos, possimus nihil? Molestias consectetur quisquam labore laboriosam officia nostrum, placeat nulla culpa. Doloremque soluta aspernatur sit pariatur praesentium aut laborum sint harum nulla architecto cupiditate voluptatibus quam reprehenderit accusamus, a culpa sunt vitae velit odio explicabo consequatur? Quas odit amet libero id saepe.',
                postId: '3577',
                userId: '33'
            }
        ]

        const context = arr.map(i => <div key={i.postId} className='page-posts'>
                                        <Link to='/user/id' className='react-Link'>
                                            <div className='page-posts-user'>
                                                <div className='page-posts-ava'>
                                                    <div>
                                                        <img src={pictures} alt="User's pictures" />
                                                    </div>
                                                </div>
                                                <span className='page-posts-nick'>{i.nick}</span>
                                            </div>
                                        </Link>
                                        <hr/>
                                        <h2>{i.title}</h2>
                                        <div>{i.text}</div>
                                    </div>)


        return (
            <div className='container'>
                <div className='d-flex flex-column align-items-center'>

                    <div className="form-inline w-100">
                        <div className='row w-100'>
                            <div className='col-10'>
                            <input className="form-control w-100" placeholder="Поиск" aria-label="Search"/>
                            </div>
                            <div className='col-2'>
                            <button className="btn btn-secondary w-100">Найти</button>
                            </div>
                        </div>     
                    </div>

                    {context}
                </div>
            </div>
        )
    }
}