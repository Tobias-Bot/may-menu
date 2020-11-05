import React from "react";

import logo from "../pics/logo.png";

class MayMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [
        {
          background:
            "https://64.media.tumblr.com/f4bb183a62a9600b538875a58e9a7bcb/cfcf9c92ad3f72e7-ac/s540x810/ec6afa71ee659161b542ee9577f9006b1577bf3c.gifv",
          text: "Свободное общение и много классных людей",
          title: "Гостиная*",
          url: "https://vk.me/join/2vJjlsqmTNLzvDYO/HQaBPgRmw6j1siAgNU=",
        },
        {
          background:
            "https://64.media.tumblr.com/c6f70187569e2c2d97c5fe85399a65cb/tumblr_pyhdzyXOIp1we9f2ro1_540.gifv",
          text: "Еще больше общения и классных людей",
          title: "Гостиная**",
          url: "https://vk.me/join/zaSAws6otA80gTrY2SETG5yXyPStJXAZho0=",
        },
        {
          background:
            "https://64.media.tumblr.com/e1f1d1ca2135011d743de541f0879db5/tumblr_oshkd2RHnM1vhvnzyo1_500.gifv",
          text:
            "В этой беседе ты всегда сможешь найти поддержку и попросить совет",
          title: "Беседа поддержки",
          url: "https://vk.me/join/DIuOFhWBRqjFGasjonZm2lvPc9iav9sjPdQ=",
        },
        {
          background:
            "https://64.media.tumblr.com/fe6d6866c5f3902586116f472a2ab20f/921683666be3fa68-8a/s540x810/90260b81c89a1cc7d3f0bdabf9096d7530e3f83d.gifv",
          text:
            "Беседа, где каждый cможет поделиться своей любимой песней или найти для себя что-нибудь новенькое",
          title: "Музыкальная беседа",
          url: "https://vk.me/join/FAo2ANp5R1v3_06Ve78hkHpsQzpNehEGFP4=",
        },
      ],
      apps: [
        {
          title: "таймер сна",
          icon: "fas fa-clock",
          url: "https://tobias-bot.github.io/Sleeping_bookapp",
        },
        {
          title: "заметки",
          icon: "fas fa-sticky-note",
          url: "https://tobias-bot.github.io/todo-app",
        },
      ],

      currentModal: "",

      aboutModal: {
        title: "О сообществе",
        text: `
          Поддержка, мотивация, статьи, забота о себе и многое другое можно найти в этом местечке.
          В Май тебя всегда поддержат и дадут совет. Это место, где ты можешь общаться с самыми
          классными людьми на планете, узнавать новое и познавать себя. Надеемся, тебе нравится у нас.
          Чувствуй себя как дома. 
        `,
      },
      rulesModal: {
        title: "Правила сообщества",
        text: `
          Пожалуйста, во избежании конфликтов и недопонимания, старайтесь соблюдать правила нашего
          сообщества. Это скорее рекомендации, которым нужно следовать и которые не должны
          ограничивать вас. Все это сделано на основе нашего опыта и лишь для того, чтобы всем было
          комфортно находится в этом сообществе. Мы ни в коем случае не хотим кого-то оскорбить или
          обидеть и просим отнестись к этому с пониманием. Поэтому, прежде чем не следовать этим
          советам, думайте о других людях.
          <br/>
          <br/>
          <h6>Общие правила</h6>
          <b>*</b> Не нужно писать комментарии, содержащие нецензурную лексику, так как в сообществе находятся люди разного возраста, кому-то это может быть неприятно читать, уважайте, пожалуйста, других людей;
          <br/>
          <b>*</b> запрещено оставлять ссылки в комментариях под записями на сомнительные ресурсы, свои паблики и беседы;
          <br/>
          <b>*</b> запрещено публиковать комментариях фото и видео материалы, содержащие сцены насилия, убийства и тому подобное;
          <br/>
          <b>*</b> при дискуссии в комментариях на странице сообщества, уважайте других ее участников и их мнения, не нужно специально устраивать конфликты и провоцировать других.
          <br/>
          <br/>
          <h6>Правила бесед</h6>
          <b>*</b> Будьте взаимовежливы и не оскорбляйте других участников беседы;
          <br/>
          <b>*</b> мат в сообщениях запрещен;
          <br/>
          <b>*</b> не следует продолжать дискуссию по теме, если вы чувствуете, что это ведет к конфликту;
          <br/>
          <b>*</b> не нужно грубить другим участникам беседы;
          <br/>
          <b>*</b> уважайте мнения других участников беседы;
          <br/>
          <b>*</b> не нужно провоцировать людей на конфликты;
          <br/>
          <b>*</b> можно оставлять ссылки на свои паблики/инстаграмм-аккаунты, но только один раз, так как это будет раздражать других участников беседы;
          <br/>
          <b>*</b> минимум спама в беседе, лучше всего стараться писать все одним сообщением и не использовать бессмысленные комбинации символов, не нужно скидывать много мемов, смешных видео, фотографий, содержащие нецензурную лексику;
          <br/>
          <b>*</b> запрещено публиковать фото и видео, содержащие сцены убийства, насилия и тому подобное.
          <br/>
          <br/>
          <h6>Правила поведения на трансляциях</h6>
          <b>*</b> Мат в чате запрещен;
          <br/>
          <b>*</b> запрещено оставлять ссылки на сомнительные ресурсы, группы Вконтакте или беседы;
          <br/>
          <b>*</b> уважайте мнение других участников трансляции;
          <br/>
          <b>*</b> не нужно провоцировать людей на конфликты;
          <br/>
          <b>*</b> не оскорбляйте других.
          <br/>
        `,
      },
      tagsModal: {
        title: "Хэштеги публикаций",
        text: `
        Присылай пост в предложенные новости на одну из ниже перечисленных тем (сообщения, содержащие нецензурную лексику, не принимаются)
        <br/>
        <br/>
        <b>#help@warmay</b> — помощь, поддержка, советы;
        <br/>
        <br/>
        <b>#ask@warmay</b> — задать вопрос, спросить о чем-либо других, просьба;
        <br/>  
        <br/>
        <b>#ps@warmay</b> — поблагодарить всех, кто дал советы под записью с хэштегами help и ask и рассказать, что произошло в итоге, что изменилось;
        <br/>
        <br/>
        <b>#look_for_you@warmay</b> — найти друга, человека, с которым можно поговорить или провести время;
        <br/> 
        <br/>
        <b>#share_with_you@warmay</b> — поделиться какой-либо полезностью, материалом, новостью;
        <br/> 
        <br/>
        <b>#story@warmay</b> — твоя история из жизни, небольшой рассказ, событие, которым ты хотел бы поделиться;
        <br/>
        <br/>
        <b>#friendly_reminder@warmay</b> — слова поддержки и мотивации;
        <br/>  
        <br/>
        <b>#feelings@warmay</b> — твои эмоции после какого-либо события, произошедшего с тобой, например, ты посетил(а) свой первый концерт или признал(ась)ся в любви, напиши то, что чувствуешь;
        <br/>
        <br/>
        <b>#upd@warmay</b> — обновления и анонсы в сообществе.
        `,
      },
    };

    this.getChats = this.getChats.bind(this);
    this.getApps = this.getApps.bind(this);
    this.getModalData = this.getModalData.bind(this);
  }

  getChats() {
    let chats = this.state.chats;
    let response = [];

    response = chats.map((chat) => {
      return (
        <div
          className="chatView"
          key={chat.title}
          style={{
            background: `url(${chat.background}) center/100% no-repeat`,
          }}
        >
          <div className="picBlackout">
            <div className="chatTitle">{chat.title}</div>
            <div className="chatText">{chat.text}</div>
            <button className="chatComeInBtn">
              <a
                style={{ textDecoration: "none", color: "white" }}
                href={chat.url}
              >
                войти
              </a>
            </button>
          </div>
        </div>
      );
    });

    return response;
  }

  getApps() {
    let apps = this.state.apps;
    let response = [];

    response = apps.map((app) => {
      return (
        <div key={app.title} className="col">
          <a className="linkStyle" href={app.url}>
            <div
              className="icon"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#ffe3e0",
                border: "2px solid  #ffe3e0",
              }}
            >
              <i className={app.icon}></i>
              <span className="iconTitle">{app.title}</span>
            </div>
          </a>
        </div>
      );
    });

    return response;
  }

  getModalData(modal) {
    this.setState((state) => {
      return {
        currentModal: state[modal],
      };
    });
  }

  render() {
    let chats = this.getChats();
    let apps = this.getApps();
    let modal = this.state.currentModal;

    return (
      <div>
        <div
          className="modal fade"
          id="textModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal.title}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                dangerouslySetInnerHTML={{ __html: modal.text }}
              ></div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="infoModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  О приложении
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="centeredText">
                  Приложение создано в
                  <br />
                  <a className="linkStyle" href="https://vk.com/warmay_studio">
                    <b>Май-студии</b>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          className="background"
          src="https://images.wallpaperscraft.ru/image/oblaka_poristyj_nebo_125791_3840x2400.jpg"
          alt="background"
        />
        <div className="wrapper">
          <img
            className="wrapperImage"
            src="https://d2halst20r4hcy.cloudfront.net/wallpapers2/071/580/898/816/original/file.jpg"
            alt="background"
          />
          <div className="headerLineTop"></div>
          <div className="headerLineBot">
            <a href="https://tobias-bot.github.io/menu" className="linkStyle">
              <div className="btnInfo">Май-сообщество</div>
            </a>
          </div>
          <div className="header">
            <a className="linkStyle" href="https://vk.com/warmay">
              <img id="logo" src={logo} alt="logo" />
            </a>
          </div>
          <div className="body">
            <div className="pageHint" id="Home">
              меню Май
            </div>
            <div className="row mt-4 mb-2">
              <div className="col">
                <div
                  className="icon"
                  data-toggle="modal"
                  data-target="#textModal"
                  onClick={(e) => this.getModalData("aboutModal")}
                >
                  <i className="fas fa-info-circle"></i>
                  <span className="iconTitle">о Май</span>
                </div>
              </div>
              <div className="col">
                <div
                  className="icon"
                  data-toggle="modal"
                  data-target="#textModal"
                  onClick={(e) => this.getModalData("rulesModal")}
                >
                  <i className="fas fa-hand-sparkles"></i>
                  <span className="iconTitle">правила</span>
                </div>
              </div>
              <div className="col">
                <a
                  href="https://vk.com/im?sel=-160404048"
                  className="linkStyle"
                >
                  <div className="icon">
                    <i className="fas fa-feather-alt"></i>
                    <span className="iconTitle">написать</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="row mt-3 mb-2">
              <div className="col">
                <div
                  className="icon"
                  data-toggle="modal"
                  data-target="#textModal"
                  onClick={(e) => this.getModalData("tagsModal")}
                >
                  <i className="fas fa-hashtag"></i>
                  <span className="iconTitle">хэштеги</span>
                </div>
              </div>
              <div className="col">
                <a
                  className="linkStyle"
                  href="https://vk.com/app5748831_-160404048"
                >
                  <div className="icon">
                    <i className="fas fa-paper-plane"></i>
                    <span className="iconTitle">рассылки</span>
                  </div>
                </a>
              </div>
              <div className="col">
                <a
                  className="linkStyle"
                  href="https://yadi.sk/d/cZHSqCmlNZ3MmA?w=1"
                >
                  <div className="icon">
                    <i className="fas fa-mug-hot"></i>
                    <span className="iconTitle">трансляции</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="row mt-3 mb-2">
              <div className="col">
                <a
                  className="linkStyle"
                  href="https://vk.com/topic-160404048_46244351"
                >
                  <div className="icon">
                    <i className="fas fa-file-signature"></i>
                    <span className="iconTitle">статьи</span>
                  </div>
                </a>
              </div>
              <div className="col">
                <a
                  className="linkStyle"
                  href="https://vk.com/audios-160404048?section=playlists"
                >
                  <div className="icon">
                    <i className="fas fa-headphones"></i>
                    <span className="iconTitle">плейлисты</span>
                  </div>
                </a>
              </div>
              <div className="col">
                <a
                  className="linkStyle"
                  href="https://vk.com/topic-160404048_36674451"
                >
                  <div className="icon">
                    <i className="fas fa-heart"></i>
                    <span className="iconTitle">лайк</span>
                  </div>
                </a>
              </div>
            </div>
            <br />
            <br />
            <div className="btnsTitle">Беседы</div>
            {chats}
            <br />
            <div className="btnsTitle">Приложения Май</div>
            <div className="row mt-4 mb-2">{apps}</div>
            <br />
          </div>
          <div
            type="button"
            className="footer"
            data-toggle="modal"
            data-target="#infoModal"
          >
            о приложении
          </div>
        </div>
      </div>
    );
  }
}

export default MayMenu;
